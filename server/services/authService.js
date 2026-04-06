import { createHmac, timingSafeEqual } from "crypto";
import { runtimeConfig } from "../config/runtime.js";

export const authConfigErrorMessage =
  "Server auth is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD and JWT_SECRET in .env.";

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAuthConfigured() {
  return Boolean(
    runtimeConfig.adminUsername &&
      runtimeConfig.adminPassword &&
      runtimeConfig.jwtSecret
  );
}

export function validateAdminCredentials(username, password) {
  if (
    !isAuthConfigured() ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return false;
  }

  return (
    safeEqual(username, runtimeConfig.adminUsername) &&
    safeEqual(password, runtimeConfig.adminPassword)
  );
}

export function createJwtToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: runtimeConfig.adminUsername,
    role: "admin",
    iss: "pehlione-content-api",
    iat: now,
    exp: now + runtimeConfig.jwtTtlSeconds,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", runtimeConfig.jwtSecret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function parseBearerToken(header) {
  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice(7).trim() || null;
}

export function verifyJwtToken(token) {
  if (!isAuthConfigured()) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  try {
    const [encodedHeader, encodedPayload, signature] = parts;
    const expectedSignature = createHmac("sha256", runtimeConfig.jwtSecret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (!safeEqual(signature, expectedSignature)) {
      return null;
    }

    const header = JSON.parse(
      Buffer.from(encodedHeader, "base64url").toString("utf8")
    );
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );
    const now = Math.floor(Date.now() / 1000);

    if (header.alg !== "HS256" || header.typ !== "JWT") {
      return null;
    }

    if (payload.iss !== "pehlione-content-api") {
      return null;
    }

    if (typeof payload.exp !== "number" || payload.exp <= now) {
      return null;
    }

    if (!safeEqual(String(payload.sub || ""), runtimeConfig.adminUsername)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

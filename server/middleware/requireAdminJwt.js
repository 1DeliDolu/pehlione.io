import {
  authConfigErrorMessage,
  isAuthConfigured,
  parseBearerToken,
  verifyJwtToken,
} from "../services/authService.js";

export function requireAdminJwt(req, res, next) {
  if (!isAuthConfigured()) {
    return res.status(500).json({
      ok: false,
      error: authConfigErrorMessage,
    });
  }

  const token = parseBearerToken(req.headers.authorization);
  const payload = token ? verifyJwtToken(token) : null;

  if (payload?.role === "admin") {
    return next();
  }

  return res.status(401).json({
    ok: false,
    error: "Unauthorized",
  });
}

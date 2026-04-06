const devApiBaseUrl = "http://localhost:3001/api";
const devUploadBaseUrl = "http://localhost:3001";

export const apiBaseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  (import.meta.env.DEV ? devApiBaseUrl : "");

export const uploadBaseUrl =
  (import.meta.env.VITE_UPLOAD_API_BASE_URL as string | undefined) ??
  (import.meta.env.DEV ? devUploadBaseUrl : "");

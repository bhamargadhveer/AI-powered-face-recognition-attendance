import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

export const apiEnabled = Boolean(baseURL);

const api = axios.create({
  baseURL: baseURL || "/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const TOKEN_KEY = "sc-token";

export function setAuthToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      setAuthToken(null);
    }
    return Promise.reject(error);
  },
);

/**
 * Try a live API call; if the backend is unreachable or disabled,
 * resolve with the provided mock data so the UI keeps working.
 */
export async function withFallback(request, mock) {
  if (!apiEnabled) return typeof mock === "function" ? mock() : mock;
  try {
    const res = await request();
    return res?.data ?? res;
  } catch (err) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[api] falling back to mock data:", err?.message);
    }
    return typeof mock === "function" ? mock() : mock;
  }
}

export default api;
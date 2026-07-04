import api, { withFallback, setAuthToken } from "./axios.js";

const DEMO_USER = {
  id: "u_001",
  name: "Aarav Sharma",
  email: "admin@smartclass.ai",
  role: "Administrator",
  institution: "Greenfield International School",
  avatar: "https://i.pravatar.cc/120?img=32",
};

export async function login({ email, password }) {
  return withFallback(
    () => api.post("/auth/login", { email, password }),
    () => {
      const token = "demo-token-" + Date.now();
      setAuthToken(token);
      return { user: { ...DEMO_USER, email: email || DEMO_USER.email }, token };
    },
  );
}

export async function register(data) {
  return withFallback(
    () => api.post("/auth/register", data),
    () => {
      const token = "demo-token-" + Date.now();
      setAuthToken(token);
      return {
        user: {
          ...DEMO_USER,
          name: data.adminName || DEMO_USER.name,
          email: data.email || DEMO_USER.email,
          institution: data.institutionName || DEMO_USER.institution,
        },
        token,
      };
    },
  );
}

export async function logout() {
  setAuthToken(null);
  return withFallback(() => api.post("/auth/logout"), { ok: true });
}

export async function me() {
  return withFallback(() => api.get("/auth/me"), { user: DEMO_USER });
}
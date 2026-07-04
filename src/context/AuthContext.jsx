import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USER = {
  id: "u_001",
  name: "Dr. Kamran Siddiqui",
  email: "admin@university.edu.pk",
  role: "Department Coordinator",
  institution: "National University of Computer & Emerging Sciences",
  avatar: "https://i.pravatar.cc/120?img=13",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("sc-user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("sc-user", JSON.stringify(user));
    else localStorage.removeItem("sc-user");
  }, [user]);

  const login = async (email) => {
    await new Promise((r) => setTimeout(r, 500));
    setUser({ ...DEMO_USER, email: email || DEMO_USER.email });
    return true;
  };
  const register = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    setUser({
      ...DEMO_USER,
      name: data.adminName || DEMO_USER.name,
      email: data.email || DEMO_USER.email,
      institution: data.institutionName || DEMO_USER.institution,
    });
    return true;
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
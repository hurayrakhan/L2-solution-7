"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, UserRole } from "@/types";
import {
  clearAuthSession,
  getAccessToken,
  getStoredUser,
  setAuthSession,
} from "@/lib/fetcher";

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  demoLogin: (role: UserRole) => Promise<boolean>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const DEMO_CREDENTIALS: Record<UserRole, { email: string; pass: string; title: string }> = {
  ADMIN: {
    email: "admin@moveinbd.com",
    pass: "AdminPass123!",
    title: "Admin",
  },
  PROVIDER: {
    email: "owner@moveinbd.com",
    pass: "OwnerPass123!",
    title: "Provider / Landlord",
  },
  TENANT_USER: {
    email: "tenant@moveinbd.com",
    pass: "TenantPass123!",
    title: "Tenant / Customer",
  },
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const existingToken = getAccessToken();
    const existingUser = getStoredUser<User>();
    if (existingToken && existingUser) {
      setToken(existingToken);
      setUser(existingUser);
    }
    setIsLoading(false);
  }, []);

  const getDashboardPath = (userRole: UserRole) => {
    switch (userRole) {
      case "ADMIN":
        return "/admin";
      case "PROVIDER":
        return "/provider";
      case "TENANT_USER":
      default:
        return "/dashboard";
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Invalid email or password");
        return false;
      }

      const { accessToken, user: loggedInUser } = data.data;
      setAuthSession(accessToken, loggedInUser);
      setToken(accessToken);
      setUser(loggedInUser);

      toast.success(`Welcome back, ${loggedInUser.name}!`);
      router.push(getDashboardPath(loggedInUser.role));
      return true;
    } catch {
      toast.error("Failed to connect to authentication server");
      return false;
    }
  };

  const demoLogin = async (targetRole: UserRole): Promise<boolean> => {
    const creds = DEMO_CREDENTIALS[targetRole];
    toast.loading(`Authenticating as ${creds.title}...`, { id: "demo-login" });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: creds.email, password: creds.pass }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Demo login failed", { id: "demo-login" });
        return false;
      }

      const { accessToken, user: loggedInUser } = data.data;
      setAuthSession(accessToken, loggedInUser);
      setToken(accessToken);
      setUser(loggedInUser);

      toast.success(`Logged in as Demo ${creds.title}!`, { id: "demo-login" });
      router.push(getDashboardPath(loggedInUser.role));
      return true;
    } catch {
      toast.error("Network error during demo login", { id: "demo-login" });
      return false;
    }
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Registration failed");
        return false;
      }

      toast.success("Account created successfully! Please sign in.");
      router.push("/login");
      return true;
    } catch {
      toast.error("Network error during registration");
      return false;
    }
  };

  const logout = () => {
    clearAuthSession();
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || null,
        isAuthenticated: Boolean(user && token),
        isLoading,
        login,
        demoLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

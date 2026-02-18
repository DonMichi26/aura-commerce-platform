import React, { createContext, useContext, useState, useCallback } from "react";
import {
  User,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  getCurrentUser,
  updateProfile as authUpdateProfile,
  changePassword as authChangePassword,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, lastName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const result = await authLogin(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, lastName?: string) => {
    setLoading(true);
    const result = await authRegister(email, password, name, lastName);
    if (result.success && result.user) {
      setUser(result.user);
    }
    setLoading(false);
    return result;
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) return { success: false, error: "No hay usuario autenticado" };
    setLoading(true);
    const result = await authUpdateProfile(user.id, data);
    if (result.success) {
      setUser(prev => prev ? { ...prev, ...data } : null);
    }
    setLoading(false);
    return result;
  }, [user]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    if (!user) return { success: false, error: "No hay usuario autenticado" };
    setLoading(true);
    const result = await authChangePassword(user.id, currentPassword, newPassword);
    setLoading(false);
    return result;
  }, [user]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

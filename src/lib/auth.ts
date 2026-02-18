import { useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthResult {
  user: User;
  token: string;
}

const USERS_KEY = "auracommerce_users";
const CURRENT_USER_KEY = "auracommerce_current_user";

// Helper para generar ID único
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Helper para hash simple (en producción usar bcrypt)
const hashPassword = async (password: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

// Obtener todos los usuarios
const getUsers = (): (AuthResult & { password: string })[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Guardar usuario
const saveUser = (user: AuthResult & { password: string }) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Actualizar usuario
const updateUser = (updatedUser: User) => {
  const users = getUsers();
  const index = users.findIndex(u => u.user.id === updatedUser.id);
  if (index !== -1) {
    users[index].user = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
  }
};

// Registro de usuario
export const register = async (
  email: string,
  password: string,
  name: string,
  lastName?: string
): Promise<{ success: boolean; error?: string; user?: User }> => {
  const users = getUsers();
  
  // Verificar si el email ya existe
  if (users.find(u => u.user.email === email)) {
    return { success: false, error: "Este email ya está registrado" };
  }

  const hashedPassword = await hashPassword(password);
  const newUser: AuthResult & { password: string } = {
    user: {
      id: generateId(),
      email,
      name,
      lastName,
      createdAt: new Date().toISOString(),
    },
    token: generateId(),
    password: hashedPassword,
  };

  saveUser(newUser);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return { success: true, user: newUser.user };
};

// Login de usuario
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> => {
  const users = getUsers();
  const hashedPassword = await hashPassword(password);
  
  const foundUser = users.find(
    u => u.user.email === email && u.password === hashedPassword
  );

  if (!foundUser) {
    return { success: false, error: "Email o contraseña incorrectos" };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
  return { success: true, user: foundUser.user };
};

// Logout
export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.dispatchEvent(new Event("storage"));
};

// Obtener usuario actual
export const getCurrentUser = (): User | null => {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUser) return null;
  
  const data: AuthResult & { password: string } = JSON.parse(currentUser);
  return data.user;
};

// Hook para usar autenticación
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    initAuth();

    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { user, loading };
};

// Actualizar perfil de usuario
export const updateProfile = async (
  userId: string,
  data: Partial<User>
): Promise<{ success: boolean; error?: string }> => {
  try {
    const users = getUsers();
    const index = users.findIndex(u => u.user.id === userId);
    
    if (index === -1) {
      return { success: false, error: "Usuario no encontrado" };
    }

    users[index].user = { ...users[index].user, ...data };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]));
    
    window.dispatchEvent(new Event("storage"));
    return { success: true };
  } catch {
    return { success: false, error: "Error al actualizar perfil" };
  }
};

// Cambiar contraseña
export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.user.id === userId);
  
  if (userIndex === -1) {
    return { success: false, error: "Usuario no encontrado" };
  }

  const hashedCurrentPassword = await hashPassword(currentPassword);
  
  if (users[userIndex].password !== hashedCurrentPassword) {
    return { success: false, error: "Contraseña actual incorrecta" };
  }

  users[userIndex].password = await hashPassword(newPassword);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true };
};

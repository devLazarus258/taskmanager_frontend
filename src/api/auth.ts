// Funções de login, registro, logout
// src/api/auth.ts
import api from "./axiosConfig";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const res = await api.post("/auth/login", payload);
  const token = res.data?.token;
  if (token) {
    localStorage.setItem("token", token);
  }
  return token;
}

export async function register(payload: RegisterPayload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// Funções CRUD de tarefas
// src/api/tasks.ts
import api from "./axiosConfig";
import type { Task } from "../types/Task";

export async function getTasks(): Promise<Task[]> {
  const res = await api.get("/tasks");
  return res.data;
}

export async function createTask(payload: Omit<Task, "id">): Promise<Task> {
  const res = await api.post("/tasks", payload);
  return res.data;
}

export async function updateTask(id: number, payload: Partial<Task>): Promise<Task> {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

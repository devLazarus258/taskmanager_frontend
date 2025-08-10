// src/types/Task.ts
export interface Task {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
}

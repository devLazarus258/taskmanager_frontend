// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import type { Task } from "../types/Task";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar tarefas (verifica token / servidor).");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd() {
    if (!title.trim()) return alert("Título obrigatório");
    await createTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
    load();
  }

  async function handleToggle(t: Task) {
    await updateTask(t.id, { ...t, completed: !t.completed });
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Confirmar remoção?")) return;
    await deleteTask(id);
    load();
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Minhas tarefas</h1>

        <div className="mb-6 flex gap-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="flex-1 border p-2 rounded" />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" className="flex-1 border p-2 rounded" />
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded">Adicionar</button>
        </div>

        {loading ? <p>Carregando...</p> : (
          <ul className="space-y-2">
            {tasks.length === 0 && <p>Nenhuma tarefa ainda.</p>}
            {tasks.map((t) => (
              <li key={t.id} className="flex justify-between items-center border p-3 rounded">
                <div onClick={() => handleToggle(t)} className={`cursor-pointer ${t.completed ? "line-through text-gray-500" : ""}`}>
                  <div className="font-semibold">{t.title}</div>
                  {t.description && <div className="text-sm text-gray-600">{t.description}</div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remover</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import type { Task } from "../types/Task";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Pega o usuário logado do contexto
  const user = useContext(UserContext);
  const loggedUserEmail = user?.email || "Desconhecido";

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
    await createTask({ title, description, completed: false, createdAt: "" });
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

  function openEditModal(task: Task) {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  }

  async function saveEdit() {
    if (!editingTask) return;
    if (!editTitle.trim()) return alert("Título obrigatório");
    await updateTask(editingTask.id, {
      ...editingTask,
      title: editTitle,
      description: editDescription,
    });
    setEditingTask(null);
    load();
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Minhas tarefas</h1>
        <p className="mb-4">Usuário logado: <strong>{loggedUserEmail}</strong></p>

        <div className="mb-6 flex gap-2">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título"
            className="flex-1 border p-2 rounded"
          />
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="space-y-2">
            {tasks.length === 0 && <p>Nenhuma tarefa ainda.</p>}
            {tasks.map(t => (
              <li
                key={t.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div
                  onClick={() => handleToggle(t)}
                  className={`cursor-pointer flex-1 ${
                    t.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  <div className="font-semibold">{t.title}</div>
                  {t.description && (
                    <div className="text-sm text-gray-600">{t.description}</div>
                  )}
                  <div className="text-xs text-gray-400">
                    Criada em: {new Date(t.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(t)}
                    className="text-yellow-500 hover:text-yellow-600 transition"
                    aria-label="Editar tarefa"
                    title="Editar tarefa"
                  >
                    <FiEdit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-500 hover:text-red-600 transition"
                    aria-label="Remover tarefa"
                    title="Remover tarefa"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Modal para edição */}
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded p-6 max-w-md w-full shadow-lg">
              <h2 className="text-xl font-bold mb-4">Editar tarefa</h2>
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="Título"
                className="w-full border p-2 rounded mb-4"
              />
              <textarea
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Descrição"
                className="w-full border p-2 rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 rounded border hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

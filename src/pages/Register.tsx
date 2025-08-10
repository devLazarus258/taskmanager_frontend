// src/pages/Register.tsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { register as apiRegister } from "../api/auth";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      await apiRegister(data);
      alert("Conta criada com sucesso. Faça login.");
      navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err?.response?.data || "Erro ao registar");
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Registar</h1>

        <label className="block mb-2">
          <span className="text-sm">Nome</span>
          <input {...register("name")} className="mt-1 block w-full border rounded p-2" required />
        </label>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input {...register("email")} type="email" className="mt-1 block w-full border rounded p-2" required />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Senha</span>
          <input {...register("password")} type="password" className="mt-1 block w-full border rounded p-2" required />
        </label>

        <button className="w-full bg-green-600 text-white py-2 rounded">Criar conta</button>

        <p className="text-sm mt-4 text-center">
          Já tem conta? <Link to="/login" className="text-blue-600">Entrar</Link>
        </p>
      </form>
    </div>
  );
}


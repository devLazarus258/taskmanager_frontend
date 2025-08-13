import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      await login(data);
      console.log("Email salvo:", localStorage.getItem("userEmail"));
      navigate("/dashboard");
    } catch (err) {
      alert("Credenciais inválidas ou erro no servidor.");
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Entrar</h1>

        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input {...register("email")} type="email" className="mt-1 block w-full border rounded p-2" required />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Senha</span>
          <input {...register("password")} type="password" className="mt-1 block w-full border rounded p-2" required />
        </label>

        <button className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>

        <p className="text-sm mt-4 text-center">
          Não tem conta? <Link to="/register" className="text-blue-600">Registar-se</Link>
        </p>
      </form>
    </div>
  );
}
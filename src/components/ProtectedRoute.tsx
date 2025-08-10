// Protege rotas privadas
// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/auth";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

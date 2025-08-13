import { createContext, useContext } from "react";

type User = { email: string };
export const UserContext = createContext<User | null>(null);

export function useUser() {
  return useContext(UserContext);
}
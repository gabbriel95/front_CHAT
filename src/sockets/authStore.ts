import { create } from "zustand";
import chatApi from "@/api/chatApi"; // Usamos Axios configurado
import { AuthActions, AuthState } from "@/interfaces/auth.interface";

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,

  login: async (email, password) => {
    try {
      const { data } = await chatApi.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      set({
        uid: data.usuario.uid,
        checking: false,
        logged: true,
        name: data.usuario.nombre,
        email: data.usuario.email,
      });

      return true;
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      return false;
    }
  },

  register: async (nombre, email, password) => {
    try {
      const { data } = await chatApi.post("/auth/register", {
        nombre,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      set({
        uid: data.usuario.uid,
        checking: false,
        logged: true,
        name: data.usuario.nombre,
        email: data.usuario.email,
      });

      return true;
    } catch (error) {
      console.error(
        "Error en registro:",
        error.response?.data || error.message
      );
      return error.response?.data?.msg || "Error en el registro";
    }
  },

  verificaToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }

    try {
      const { data } = await chatApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      set({
        uid: data.usuario.uid,
        checking: false,
        logged: true,
        name: data.usuario.nombre,
        email: data.usuario.email,
      });

      return true;
    } catch (error) {
      console.error(
        "Error verificando token:",
        error.response?.data || error.message
      );
      set({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ uid: null, checking: false, logged: false, name: null, email: null });
  },
}));

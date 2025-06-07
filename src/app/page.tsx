"use client";

import { useAuthStore } from "@/sockets/authStore";

export default function RegisterPage() {
  const { register, logged } = useAuthStore();

  const handleRegister = async () => {
    const success = await register("TestUser", "test3@test.com", "123456");

    if (success === true) {
      console.log("Registro exitoso!");
    } else {
      console.error("Error en registro:", success);
    }
  };

  return (
    <div>
      <h1>{logged ? "Registro exitoso!" : "Por favor, regístrate"}</h1>
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
}

"use client";

import Navbar from "../components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setErrorLogin(false);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin"); // redirigir si todo va bien
    } else {
      const { error } = await res.json();
      setErrorLogin(error);
    }
  };

  if (loading)
    return <div className="w-full h-full animate-spin text-pink-500"></div>;

  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="flex-col justify-center p-10 w-full">
          <div className="text-4xl font-caprasimo">
            <h1 className="text-puce">Dorama</h1>
            <h1 className="text-fern-green">View</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col justify-center mt-10 text-black w-5/6"
          >
            <p className="">Mail</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="outline-2 outline-fern-green rounded-xl py-1 px-2"
              name="email"
              type="email"
            />
            <p className="mt-2">Contraseña</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="outline-2 outline-fern-green rounded-xl py-1 px-2"
              name="password"
              type="password"
            />
            <div className="h-12">
              <p className="mt-2 text-sm">*El acceso es solo para admins</p>
              {errorLogin ? (
                <p className="text-sm text-red-800">
                  *Mail o contraseña incorrectos
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-fern-green px-8 py-1 rounded-xl text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

"use client";

import loginAction from "@/utils/login";
import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState<boolean>(false);

  const handleLogin = async (formData: FormData) => {
    try {
      const error = await loginAction(formData);
      if (error) {
        setErrorLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            action={handleLogin}
            className="flex flex-col justify-center mt-10 text-black w-5/6"
          >
            <p className="">Mail</p>
            <input
              className="outline-2 outline-fern-green rounded-xl py-1 px-2"
              name="email"
              type="email"
            />
            <p className="mt-2">Contraseña</p>
            <input
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

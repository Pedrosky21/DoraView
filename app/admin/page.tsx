import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/SupabaseServer";
import Botones from "./components/botones";

export default async function Admin() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login"); // Redirige si no hay sesión
  }

  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="text-black p-10">
          <h2 className="text-4xl text-fern-green font-caprasimo">Hola!</h2>
          <h3 className="text-xl text-black">Qué vas a hacer hoy?</h3>
          <Botones></Botones>
        </div>
      </div>
    </>
  );
}

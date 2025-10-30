"use server";

import { redirect } from "next/navigation";
import { createClient } from "./SupabaseServer";

export default async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return error
    }

    // Redirige a otra página después del login exitoso
    redirect("/admin"); // ejemplo de redirección

    // **No retornamos `data.user`**, la función debe ser void
}
import { createClient } from "@/utils/SupabaseServer";
import { redirect } from "next/navigation";
import CrateDoramaForm from "./components/CreateDoramaForm";

export default async function CrateDoramaPage() {
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) redirect("/login");
  return (
    <>
      <CrateDoramaForm></CrateDoramaForm>
    </>
  )
}

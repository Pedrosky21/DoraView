import { supabase } from "@/utils/SupabaseClient";

export const getDoramas = async () => {
  const { data, error } = await supabase
    .from("doramas")
    .select();
  if (error) {
    console.error("Error fetching doramas:", error);
    return [];
  }
  return data;
};

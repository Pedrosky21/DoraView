import { supabase } from "@/utils/SupabaseClient";
import { createClient } from "@/utils/SupabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Leer filtros
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const genero = searchParams.get("genero");
    const tag = searchParams.get("tag");
    const calificacion = searchParams.get("calificacion");
    if (id) {
      const { data, error } = await supabase
        .from("doramas")
        .select(
          `
      *,
      generos:doramas_categorias(
        categoria_id,
        categorias(nombre)
      ),
      tags:doramas_tags(
        tag_id,
        tags(nombre)
      )
    `
        )
        .eq("id", parseInt(id));

      if (error) {
        console.error("Supabase error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      // Inner porque hay relacion muchos a muchos
      let query = supabase.from("doramas").select(`
      *,
      doramas_categorias!inner(categoria_id),
      doramas_tags!inner(tag_id)
    `);

      // aplicacion filtros
      if (genero)
        query = query.eq("doramas_categorias.categoria_id", parseInt(genero));
      if (tag) query = query.eq("doramas_tags.tag_id", parseInt(tag));
      if (calificacion)
        query = query.gte("calificacion", parseInt(calificacion));

      const { data, error } = await query;

      if (error) {
        console.error("Supabase error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      return new Response(JSON.stringify(data), { status: 200 });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const dorama = await request.json();

    const supabaseServer = await createClient();

    const { data, error } = await supabaseServer
      .from("doramas")
      .insert([
        {
          titulo: dorama.titulo,
          sinopsis: dorama.sinopsis,
          review: dorama.review,
          imagen_url: dorama.imagen_url,
          calificacion: dorama.calificacion,
        },
      ])
      .select("*")
      .single();

    const doramaID = data?.id;

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    if (dorama.categorias?.length) {
      await Promise.all(
        dorama.categorias.map(async (categoriaID: number) => {
          const { error: catError } = await supabaseServer
            .from("doramas_categorias")
            .insert([{ dorama_id: doramaID, categoria_id: categoriaID }]);
          if (catError) console.error("Error al insertar categoría:", catError);
        })
      );
    }

    if (dorama.tags?.length) {
      await Promise.all(
        dorama.tags.map(async (tagID: number) => {
          const { error: tagError } = await supabaseServer
            .from("doramas_tags")
            .insert([{ dorama_id: doramaID, tag_id: tagID }]);
          if (tagError) console.error("Error al insertar tag:", tagError);
        })
      );
    }

    return NextResponse.json({
      message: "Datos guardados correctamente",
      data,
    });
  } catch (err) {
    console.error("Error general:", err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

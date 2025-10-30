"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import Genero from "@/types/Genero";
import Tag from "@/types/Tag";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { supabase } from "@/utils/SupabaseClient";
import Calificacion from "../components/calificacionEstrellas";
import { redirect } from "next/navigation";

export default function CrateDoramaForm() {
  const [titulo, setTitulo] = useState<string>("");
  const [sinopsis, setSinopsis] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [calificacion, setCalificacion] = useState<number>(0);
  const [generosIDs, setGenerosData] = useState<number[]>([]);
  const [tagsIDs, setTagsData] = useState<number[]>([]);
  const [imagen_url, setImagenUrl] = useState<string>("");

  const [imagen, setImagen] = useState<File | null>(null);

  const uploadImagen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) return alert("Selecciona una imagen primero");

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    const { error } = await supabase.storage
      .from("doramas-imagenes")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error al subir:", error.message);
      alert("Error al subir la imagen");
      return;
    }

    // Obtener URL pública
    const { data } = supabase.storage
      .from("doramas-imagenes")
      .getPublicUrl(fileName);

    console.log(data.publicUrl);
    setImagenUrl(data.publicUrl);
  };

  const deleteImage = () => {
    setImagen(null);
    setImagenUrl("");
  };

  const [tags, setTags] = useState<Tag[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);

  const [genSelecc, setGenSelecc] = useState<string[]>([]);
  const [openGen, setOpenGen] = useState<boolean>(false);
  const dropDownIcon = useRef<SVGSVGElement>(null);
  const [rotado, setRotado] = useState(false);

  const tagRef = useRef<HTMLUListElement | null>(null);
  const [tagsSelecc, setTagSelecc] = useState<string[]>([]);
  const [openTag, setOpenTag] = useState<boolean>(false);
  const [tagsFiltrados, setTagsFiltrados] = useState<Tag[]>([]);

  const handleOpenSeleccGen = () => {
    if (dropDownIcon.current) {
      animate(dropDownIcon.current, {
        rotate: rotado ? 0 : 180,
        duration: 300,
      });
      setRotado(!rotado);
    }
    setOpenGen(!openGen);
  };

  const handleSeleccGen = (genero: Genero) => {
    setGenSelecc((prev) => [...prev, genero.nombre]);
    setGenerosData((prev) => [...prev, genero.id]);
    handleOpenSeleccGen();
  };

  const deleteSeleccGen = (index: number) => {
    setGenSelecc((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSeleccTag = (tag: Tag) => {
    setTagSelecc((prev) => [...prev, tag.nombre]);
    setTagsData((prev) => [...prev, tag.id]);
    setOpenTag(false);
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Filtrar opciones
    if (inputValue !== "") {
      const filtered = tags.filter((tag) =>
        tag.nombre.toLowerCase().includes(inputValue.toLowerCase())
      );
      setTagsFiltrados(filtered);
      setOpenTag(true);
    } else {
      setTagsFiltrados([]);
      setOpenTag(false);
    }
  };

  const deleteSeleccTag = (index: number) => {
    setTagSelecc((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const loadGeneros = async () => {
      try {
        const res = await fetch("/api/generos");
        const gens = await res.json();
        setGeneros(gens);
      } catch (error) {
        console.log(error);
      }
    };
    const loadTags = async () => {
      try {
        const res = await fetch("/api/tags");
        const tags = await res.json();
        setTags(tags);
      } catch (error) {
        console.log(error);
      }
    };

    loadGeneros();
    loadTags();
  }, []);

  const botonSubirEnabled = (): boolean => {
    const camposCompletos =
      titulo?.trim() &&
      sinopsis?.trim() &&
      review?.trim() &&
      imagen_url?.trim();

    const listasValidas = tagsIDs.length > 0 && generosIDs.length > 0;
    const calificacionValida = calificacion > 0 && calificacion <= 5;

    return Boolean(camposCompletos && listasValidas && calificacionValida);
  };

  const crearDorama = async () => {
    if (
      titulo &&
      sinopsis &&
      review &&
      tagsIDs.length > 0 &&
      generosIDs.length > 0 &&
      calificacion > 0 &&
      calificacion <= 5 &&
      imagen_url
    ) {
      const dorama = {
        titulo,
        sinopsis,
        review,
        tags: tagsIDs,
        categorias: generosIDs,
        calificacion,
        imagen_url,
      };
      try {
        const res = await fetch("/api/doramas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dorama),
        });
        const data = await res.json();

        if (!res.ok) {
          console.error("Error:", data);
          alert("Error al guardar dorama");
          return;
        }
        alert("Dorama guardado correctamente");
        setTimeout(() => {redirect(`/dorama-info/${data.data.id}`)}, 2000)
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="overflow-hidden pb-2">
        <Navbar></Navbar>
        <div className="w-9/10 h-full bg-rosa-pastel me-2 py-2 rounded-r-xl">
          <div className="flex justify-between items-center pl-2">
            <div className="flex items-start pl-2">
              <div className="w-50 h-72 relative">
                <label
                  htmlFor="imagen"
                  className={`flex flex-col justify-center items-center cursor-pointer bg-white/60 px-4 py-2 rounded-xl h-full w-full text-black ${
                    imagen_url ? "hidden" : "block"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="text-center">Subir imagen</p>
                </label>
                <input
                  id="imagen"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => uploadImagen(e)}
                />
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  alt={"titulo"}
                  src={
                    `${imagen_url}` ||
                    "https://i.pinimg.com/736x/41/9b/00/419b00573488b64b568be4e770bbf21f.jpg"
                  }
                  quality={75}
                  className={`rounded-xl object-cover ${
                    imagen_url ? "block" : "hidden"
                  }`}
                ></Image>
              </div>
              <button onClick={deleteImage} className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 text-red-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="w-16">
              <Calificacion calificar={setCalificacion}></Calificacion>
            </div>
          </div>
          <div className="mt-2 flex p-2 bg-fern-green max-w-70 rounded-r-xl wrap-break-word">
            <input
              onChange={(e) => setTitulo(e.target.value)}
              className="text-2xl font-caprasimo w-full focus:outline-0"
              type="text"
              placeholder="Titulo"
            />
          </div>
          <div className="flex flex-col space-y-2 ml-2 mt-2 text-black">
            <div className="">
              <div className="flex justify-between items-center pr-5">
                <h2 className="font-caprasimo text-2xl">Géneros</h2>
              </div>
              <div className="relative flex space-x-2 flex-wrap">
                <button
                  onClick={() => setOpenGen(!openGen)}
                  className="flex justify-between space-x-2 rounded-full h-10 w-30 items-center bg-puce px-4 py-1 text-white"
                >
                  <p>Agregar</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute top-10 z-10 bg-puce h-48 overflow-y-auto overflow-x-hidden w-30 rounded-lg px-2 py-1 ${
                    openGen ? "block" : "hidden"
                  }`}
                >
                  {generos
                    .filter((gen) => !genSelecc.includes(gen.nombre))
                    .map((gen, i) => (
                      <div
                        onClick={() => handleSeleccGen(gen)}
                        className="py-1 rounded-xl text-white"
                        key={i}
                      >
                        {gen.nombre}
                      </div>
                    ))}
                </div>
                {genSelecc.length > 0 &&
                  genSelecc.map((genSelecc, i) => (
                    <div
                      className="flex space-x-2 items-center h-10 mb-2 bg-puce rounded-xl pl-3 pr-2 py-1 text-white"
                      key={i}
                    >
                      <p>{genSelecc}</p>
                      <button onClick={() => deleteSeleccGen(i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6 text-red-800"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="">
              <h2 className="font-caprasimo text-2xl">Sinopsis</h2>
              <textarea
                onChange={(e) => setSinopsis(e.target.value)}
                className="bg-white w-7/8 rounded-b-xl rounded-r-xl h-24 align-text-top focus:outline-0 px-2 py-1"
              />
            </div>
            <div className="">
              <h2 className="font-caprasimo text-2xl">Review</h2>
              <textarea
                onChange={(e) => setReview(e.target.value)}
                className="bg-white w-7/8 rounded-b-xl rounded-r-xl h-24 align-text-top focus:outline-0 px-2 py-1 resize-none break-word"
              />
            </div>
            <div className="flex justify-between items-center pr-5">
              <h2 className="font-caprasimo text-2xl">Tags</h2>
            </div>
            <div className="flex relative space-x-2 w-full flex-wrap pr-2">
              <button className="flex justify-between space-x-2 w-48 rounded-full bg-puce px-4 py-1 text-white">
                <input
                  onChange={(e) => handleChangeTag(e)}
                  className="focus:outline-0"
                  type="text"
                />
              </button>
              <ul
                ref={tagRef}
                className={`absolute w-48 top-8 bg-puce h-30 overflow-y-auto overflow-x-hidden rounded-xl px-4 py-1 text-white  ${
                  openTag && tagsFiltrados.length > 0 ? "block" : "hidden"
                }`}
              >
                {openTag &&
                  tagsFiltrados
                    .filter((tag) => !tagsSelecc.includes(tag.nombre))
                    .map((tag, i) => (
                      <li onClick={() => handleSeleccTag(tag)} className="py-1" key={i}>
                        {tag.nombre}
                      </li>
                    ))}
              </ul>
            </div>
            <div className="flex flex-wrap space-x-2">
              {tagsSelecc.length > 0 &&
                tagsSelecc.map((tag, i) => (
                  <div
                    className="flex space-x-2 items-center h-10 mb-2 bg-puce rounded-xl px-2 py-1 text-white"
                    key={i}
                  >
                    <p>{tag}</p>
                    <button
                      onClick={() => {
                        deleteSeleccTag(i);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-red-800"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex justify-end mr-2 mt-20">
              <button
                disabled={!botonSubirEnabled()}
                onClick={crearDorama}
                className={`flex justify-between space-x-4 items-center px-2 py-2 rounded-xl text-white transition-colors ${
                  botonSubirEnabled()
                    ? "bg-fern-green hover:bg-fern-green/90 cursor-pointer"
                    : "bg-fern-green/60 cursor-not-allowed"
                }`}
              >
                <p className="text-xl">Subir</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

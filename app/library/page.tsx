"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { animate } from "animejs";
import DoramaList from "../components/doramas/DoramaList";
import Dorama from "@/types/Dorama";
import Tag from "@/types/Tag";
import Genero from "@/types/Genero";

export default function Library() {
  const [doramas, setDoramas] = useState<Dorama[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [openFiltros, setOpenFiltros] = useState<boolean>(false);

  const [genSelecc, setGenSelecc] = useState<Genero>({ id: 0, nombre: "" });
  const [openGen, setOpenGen] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>("");
  const [tagSelecc, setTagSelecc] = useState<Tag>({ id: 0, nombre: "" });
  const [openTag, setOpenTag] = useState<boolean>(false);
  const [tagsFiltrados, setTagsFiltrados] = useState<Tag[]>([]);

  const genRef = useRef<HTMLDivElement | null>(null);
  const tagRef = useRef<HTMLUListElement | null>(null);
  const dropDownIcon = useRef<SVGSVGElement>(null);
  const [rotado, setRotado] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);

  useEffect(() => {
    const fetchDoramas = async () => {
      try {
        const res = await fetch("/api/doramas").finally(() =>
          setLoading(false)
        );
        const data = await res.json();
        setDoramas(data);
      } catch (error) {
        console.error(error);
      }
    };

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
    fetchDoramas();
  }, []);

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
    setGenSelecc(genero);
    handleOpenSeleccGen();
  };

  const handleSeleccTag = (tag: Tag) => {
    setTagSelecc(tag);
    setTagInput(tag.nombre);
    setOpenTag(false);
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTagInput(inputValue);

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

  const handleBorrarFiltros = () => {
    setTagSelecc({ id: 0, nombre: "" });
    setGenSelecc({ id: 0, nombre: "" });
    setTagInput("");
  };

  // Cerrar dropdowns de tags y generos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (genRef.current && !genRef.current.contains(event.target as Node)) {
        setOpenGen(false);
      }

      if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
        setOpenTag(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const aplicarFiltros = () => {
    console.log(tagSelecc);
    console.log(genSelecc);
    const loadDoramasFiltrados = async () => {
      try {
        let params = "?"
        if (genSelecc) {
          params += `genero=${genSelecc.id.toString()}`
        }
        if (tagSelecc) {
          params += `&tag=${tagSelecc.id.toString()}`;
        }
        const res = await fetch(
          `/api/doramas${params}`
        );
        const data = await res.json();
        setDoramas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };
    loadDoramasFiltrados();
  };

  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="mx-4 mb-2 bg-rosa-pastel p-4 rounded-xl text-black">
          <div className="flex w-full items-center pl-2 bg-white/60 rounded-xl h-12">
            <input
              className="flex-1 h-full focus:outline-0"
              placeholder="Busca por titulo"
              type="text"
            />
            <button className="h-full p-2">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <div className="mt-2">
            <button onClick={() => setOpenFiltros(!openFiltros)}>
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
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </button>
            <div
              className={`flex flex-col space-y-2 bg-white/60 rounded-xl py-4 px-8 ${
                openFiltros ? "block" : "hidden"
              }`}
            >
              <div className="flex space-x-4 items-center">
                <p className="w-20">Género</p>
                <ul className="relative rounded-full bg-fern-green w-40 text-white">
                  <button
                    onClick={() => handleOpenSeleccGen()}
                    className="w-full flex justify-between pl-4 pr-2 py-2"
                  >
                    <p className="text-center">
                      {genSelecc?.nombre || "Selecciona"}
                    </p>
                    <svg
                      ref={dropDownIcon}
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
                    className={`absolute z-10 bg-fern-green w-full h-24 overflow-y-auto overflow-x-hidden rounded-lg px-2 py-1 ${
                      openGen ? "block" : "hidden"
                    }`}
                  >
                    {generos.map((gen, i) => (
                      <li
                        onClick={() => handleSeleccGen(gen)}
                        className="py-1 rounded-xl"
                        key={i}
                      >
                        {gen.nombre}
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
              <div className="flex space-x-4 items-center">
                <p className="w-20">Tag</p>
                <div className="relative w-40 rounded-full bg-white/60 border-2 border-fern-green">
                  <div className="px-2 py-1">
                    <input
                      onChange={handleChangeTag}
                      placeholder={"Busca..."}
                      className="w-full focus:outline-0 text-md"
                      type="text"
                      value={tagInput}
                    />
                  </div>
                  <ul
                    ref={tagRef}
                    className={`absolute z-10 bg-white rounded-xl w-full h-24 overflow-y-auto overflow-x-hidden px-2 py-1 outline-1 outline-fern-green ${
                      openTag && tagsFiltrados.length > 0 ? "block" : "hidden"
                    }`}
                  >
                    {openTag &&
                      tagsFiltrados.map((tag, i) => (
                        <li
                          className="py-1"
                          onClick={() => handleSeleccTag(tag)}
                          key={i}
                        >
                          {tag.nombre}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <button onClick={() => handleBorrarFiltros()} className="py-1">
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={aplicarFiltros}
                  className="bg-fern-green rounded-full px-4 py-1"
                >
                  <p className="text-white">Aplicar</p>
                </button>
              </div>
            </div>
          </div>
          {/* Listado doramas */}
          <div className="mt-2 flex justify-center">
            {loading ? (
              <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              ""
            )}
            <DoramaList doramas={doramas}></DoramaList>
          </div>
        </div>
      </div>
    </>
  );
}

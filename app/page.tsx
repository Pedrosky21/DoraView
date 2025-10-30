"use client";

import { useEffect, useState } from "react";
import DoramaCarrousel from "./components/doramas/DoramaCarrousel";
import Navbar from "./components/Navbar";
import DoramaModal from "./components/doramas/DoramaModal";
import Dorama from "@/types/Dorama";

export default function Home() {
  const [doramaMostrar, setDoramaMostrar] = useState<Dorama>({
    titulo: "Titulo",
    sinopsis: "Sinopsis",
    id: 0,
    review: "Review",
    imagen_url: "",
    calificacion: 1,
  });
  const [showDoramaModal, setShowDoramaModal] = useState<boolean>(false);
  const [mejoresDoramas, setMejoresDoramas] = useState<Dorama[]>([]);
  const [loadingMejores, setLoadingMejores] = useState<boolean>(true);
  const [romanceDoramas, setRomanceDoramas] = useState<Dorama[]>([]);
  const [loadingRomance, setLoadingRomance] = useState<boolean>(true);

  useEffect(() => {
    const loadMejores = async () => {
      try {
        const res = await fetch("/api/doramas?calificacion=5");
        const data = await res.json();
        setMejoresDoramas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };
    const loadRomance = async () => {
      try {
        const res = await fetch("/api/doramas?genero=23");
        const data = await res.json();
        setRomanceDoramas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };

    loadMejores();
    loadRomance();
  }, []);

  const clickDorama = (dorama:Dorama) => {
    setDoramaMostrar(dorama);
    setShowDoramaModal(true);
  };

  const clickClose = () => {
    setShowDoramaModal(false);
  };

  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="w-full bg-raisin-black py-6 px-6">
          <div className="text-3xl font-caprasimo">
            <p className="text-white">Calificaciones</p>
            <p className="text-puce">CLARAS,</p>
            <p className="text-white">historias</p>
            <p className="text-fern-green">COMPLETAS</p>
          </div>
        </div>
        <div className="pt-6">
          <DoramaCarrousel
            titulo="Mejor calificación"
            onClickDorama={clickDorama}
            doramas={mejoresDoramas}
          ></DoramaCarrousel>
          <DoramaCarrousel
            titulo="Romance"
            onClickDorama={clickDorama}
            doramas={romanceDoramas}
          ></DoramaCarrousel>
        </div>
        <div
          className={`fixed backdrop-blur-sm flex items-center justify-center z-10 inset-0 ${
            showDoramaModal ? "block" : "hidden"
          }`}
        >
          <DoramaModal
            id={doramaMostrar.id}
            titulo={doramaMostrar.titulo}
            imagen_url={doramaMostrar.imagen_url}
            calificacion={doramaMostrar.calificacion}
            generos={doramaMostrar.generos}
            tags={doramaMostrar.tags}
            onClose={clickClose}
          ></DoramaModal>
        </div>
      </div>
    </>
  );
}

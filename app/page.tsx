"use client";

import { useState } from "react";
import DoramaCarrousel from "./components/doramas/DoramaCarrousel";
import Navbar from "./components/Navbar";
import DoramaModal from "./components/doramas/DoramaModal";

export default function Home() {
  const [showDoramaModal, setShowDoramaModal] = useState<boolean>(false);

  const clickDorama = () => {
    setShowDoramaModal(true)
  }

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
            doramas={[
              {
                id: 1,
                titulo: "titulo largo como para que se vea",
                calificacion: 5,
                sinopsis: "",
                review: "",
                imagen_url:
                  "https://i.pinimg.com/736x/41/9b/00/419b00573488b64b568be4e770bbf21f.jpg",
              },
              {
                id: 2,
                titulo: "Titulo largo como para que se vea",
                calificacion: 4,
                sinopsis: "",
                review: "",
                imagen_url:
                  "https://i.pinimg.com/736x/41/9b/00/419b00573488b64b568be4e770bbf21f.jpg",
              },
              {
                id: 3,
                titulo: "Titulo largo como para que se vea",
                calificacion: 1,
                sinopsis: "",
                review: "",
                imagen_url:
                  "https://i.pinimg.com/736x/41/9b/00/419b00573488b64b568be4e770bbf21f.jpg",
              },
            ]}
          ></DoramaCarrousel>
          <DoramaCarrousel
            titulo="Romance"
            onClickDorama={clickDorama}
            doramas={[
              {
                id: 1,
                titulo: "titulo",
                calificacion: 5,
                sinopsis: "",
                review: "",
                imagen_url:
                  "https://i.pinimg.com/736x/41/9b/00/419b00573488b64b568be4e770bbf21f.jpg",
              },
            ]}
          ></DoramaCarrousel>
        </div>
        <div className={`fixed backdrop-blur-sm flex items-center justify-center z-10 inset-0 ${showDoramaModal? "block" : "hidden"}`}>
          <DoramaModal
            id={1}
            titulo="Titulo"
            imagen_url="https://i.pinimg.com/736x/41/9b/00/419b00573488b64b568be4e770bbf21f.jpg"
            calificacion={5}
            generos={["genero1", "genero2", "genero3", "genero4"]}
            tags={["tag 1", "tag 2"]}
          >
          </DoramaModal>
        </div>
      </div>
    </>
  );
}

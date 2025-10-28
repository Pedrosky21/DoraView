import Navbar from "@/app/components/Navbar";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DoramaInfo({ params }: PageProps) {
  const titulo = "titulo Largo por si las dudas";
  const generos = ["Genero1", "Genero2", "Genero3", "Genero4"];
  const tags = ["TagLargo1", "Tag2", "TagLargo3", "TagLarguisimoPorLasDudas"];
  const sinopsis =
    "titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas";
  const review =
    "titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas titulo Largo por si las dudas";

  return (
    <>
      <div className="overflow-hidden pb-2">
        <Navbar></Navbar>
        <div className="w-9/10 h-full bg-rosa-pastel me-2 py-2 rounded-r-xl">
          <div className="flex justify-between items-center pl-2">
            <Image
              loading="eager"
              alt={titulo}
              src={
                "https://i.pinimg.com/736x/41/9b/00/419b00573488b64b568be4e770bbf21f.jpg"
              }
              height={20}
              width={200}
              quality={100}
              className="rounded-xl object-cover"
            ></Image>
            <div className="">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            {/* Barra lateral estilo Netflix */}
            <div className="flex flex-col items-center justify-center bg-fern-green rounded-l-2xl py-10 w-14 h-32 shadow-black/30 shadow-xl">
              {/* Texto vertical */}
              <p className="transform -rotate-90 font-caprasimo text-2xl tracking-widest">
                Netflix
              </p>
            </div>
          </div>
          <div className="mt-2 flex p-2 bg-fern-green max-w-70 rounded-r-xl wrap-break-word">
            <h2 className="font-caprasimo text-2xl">{titulo}</h2>
          </div>
          <div className="flex flex-col space-y-2 ml-2 mt-2">
            <div className="flex space-x-2 flex-wrap space-y-2">
              {generos.map((gen, i) => (
                <div key={i} className="bg-puce rounded-xl px-2 py-1">
                  <p>{gen}</p>
                </div>
              ))}
            </div>
            <div className="text-black">
              <h2 className="font-caprasimo text-2xl">Sinopsis</h2>
              <p>{`"${sinopsis}"`}</p>
            </div>
            <div className="text-black">
              <h2 className="font-caprasimo text-2xl">Review</h2>
              <p>{`${review}`}</p>
            </div>
            <h3 className="text-black text-xl font-caprasimo">Tags</h3>
            <div className="flex space-x-2 w-full flex-wrap space-y-2">
              {tags.map((gen, i) => (
                <div key={i} className="bg-puce rounded-xl px-2 py-1">
                  <p className="text-sm">{gen}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

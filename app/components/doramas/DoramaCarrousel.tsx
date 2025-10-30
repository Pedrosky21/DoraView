import Image from "next/image";
import Dorama from "../../../types/Dorama";

interface DoramaCarrousel {
  titulo: string;
  doramas: Dorama[];
  onClickDorama: (dorama:Dorama) => (void);
}

export default function DoramaCarrousel({ titulo, doramas, onClickDorama }: DoramaCarrousel) {
  return (
    <>
      <div className="w-full px-3">
        <h2 className="text-2xl text-fern-green font-medium border-b border-fern-green">
          {titulo}
        </h2>
        <ul className="flex space-x-6 py-2 text-black overflow-auto scroll-smooth snap-x scrollbar-hide">
          {doramas.map((dorama, i) => (
            <li
              onClick={() => onClickDorama(dorama)}
              className="shrink-0 flex flex-col justify-center overflow-auto w-30 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale:105"
              key={i}
            >
              <div className="relative h-40">
                <Image
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={dorama.titulo}
                  src={dorama.imagen_url}
                  quality={100}
                  className="rounded-lg"
                ></Image>
              </div>
              <div className="flex justify-center mt-1">
                {[...Array(dorama.calificacion)].map((_, i) => (
                  <span key={i}>
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
                ))}
              </div>
              <h3 className="text-center h-12 overflow-hidden text-ellipsis line-clamp-2">
                {dorama.titulo}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

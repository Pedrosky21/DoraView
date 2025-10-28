import Image from "next/image";
import Link from "next/link";

interface DoramaModal {
  id: number;
  titulo: string;
  imagen_url: string;
  generos: string[];
  tags: string[];
  calificacion: number;
}

export default function DoramaModal({
  id,
  titulo,
  imagen_url,
  generos,
  tags,
  calificacion,
}: DoramaModal) {
  return (
    <>
      <div className="flex flex-col justify-center px-2 py-3 w-4/5 bg-fern-green shadow-black shadow-2xl rounded-xl">
        <div className="flex justify-between w-full mb-2">
          <h2>Info del dorama</h2>
          <button>
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
        <div className="relative h-96 w-full">
          <Image
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={titulo}
            src={imagen_url}
            quality={100}
            className="rounded-t-xl object-cover"
          ></Image>
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="flex justify-end">
              <div className="flex bg-black/60 backdrop-blur-sm rounded-tr-xl rounded-bl-xl p-2">
                {[...Array(calificacion)].map((_, i) => (
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
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-t-xl p-2">
              <h2 className="font-caprasimo text-2xl">{titulo}</h2>
              <div className="flex space-x-2 w-full overflow-scroll scrollbar-hide">
                {generos.map((gen, i) => (
                  <div key={i} className="bg-puce rounded-xl px-2 py-1">
                    <p>{gen}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex space-x-2 w-full overflow-hidden">
                {tags.map((gen, i) => (
                  <div key={i} className="bg-puce rounded-xl px-2 py-1">
                    <p className="text-sm">{gen}</p>
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-end">
                <Link href={`/dorama-info/${id}`} className="rounded-xl border border-black bg-fern-green py-1 px-2 hover:bg-lime-900">
                  Más info...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

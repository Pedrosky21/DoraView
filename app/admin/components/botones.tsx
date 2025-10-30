"use client";

import { useRouter } from "next/navigation";

export default function Botones() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/createDorama");
  };

  return (
    <div className="mt-10">
      <button
        onClick={handleCreate}
        className="flex justify-between bg-fern-green p-4 rounded-2xl text-white w-full"
      >
        <p>Cargar dorama</p>
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
      </button>
    </div>
  );
}

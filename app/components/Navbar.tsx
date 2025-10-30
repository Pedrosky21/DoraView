"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { animate } from "animejs";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLButtonElement>(null);
  const libraryRef = useRef<HTMLButtonElement>(null);
  const loginRef = useRef<HTMLButtonElement>(null);

  const clickButton = () => {
    setShowMenu(!showMenu);
    if (homeRef.current) {
      animate(homeRef.current, {
        translateX: ["40px", "0px"],
        ease: "inOut",
        opacity: [0, 1],
        duration: 200,
      });
    }
    if (libraryRef.current) {
      animate(libraryRef.current, {
        translateX: ["40", "0px"],
        translateY: ["-40", "0px"],
        ease: "inOut",
        opacity: [0, 1],
        duration: 200,
      });
    }
    if (loginRef.current) {
      animate(loginRef.current, {
        translateY: ["-40px", "0px"],
        ease: "inOut",
        opacity: [0, 1],
        duration: 200,
      });
    }
  };

  return (
    <>
      <div className="relative flex h-18 px-4 items-center justify-between">
        <Link href="/" className="text-puce text-2xl font-caprasimo">
          Dorama<span className="text-fern-green">View</span>
        </Link>
        <div ref={divRef} className="flex items-center">
          <button
            onClick={() => clickButton()}
            className="bg-fern-green border-2 border-black rounded-lg p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-6 ${showMenu ? "hidden" : "block"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-6 ${showMenu ? "block" : "hidden"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Link
            href="/"
            className={`absolute z-10 right-20 ${
              showMenu ? "block" : "hidden"
            }`}
          >
            <button
              ref={homeRef}
              className="bg-fern-green p-2 border-2 border-black rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </button>
          </Link>
          <Link
            href="/library"
            className={`absolute z-10 right-20 top-20 ${
              showMenu ? "block" : "hidden"
            }`}
          >
            <button
              ref={libraryRef}
              className="bg-fern-green border-2 border-black rounded-lg p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
              </svg>
            </button>
          </Link>
          <Link
            href="/login"
            className={`absolute z-10 right-4 top-20 ${
              showMenu ? "block" : "hidden"
            }`}
          >
            <button
              ref={loginRef}
              className="bg-fern-green border-2 border-black rounded-lg p-2"
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
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

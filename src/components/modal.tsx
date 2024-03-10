"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { X } from "@phosphor-icons/react";

import github from "@/assets/icons/github.svg";
import google from "@/assets/icons/google.svg";
import { Overlay } from "./overlay";

function Content() {
  return (
    <div className="relative flex items-center justify-center w-[516px] h-[337px] py-14 px-[72px] bg-gray-700 rounded-xl">
      <button className="absolute top-4 right-4">
        <X size={24} className="text-gray-400" />
      </button>
      <div>
        <p className="text-gray-200 text-center font-bold">
          Faça login para deixar sua avaliação
        </p>
        <div className="mt-10 flex flex-col gap-4">
          <button className="flex items-center gap-5 p-5 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors outline-none">
            <Image src={google} alt="google" width={30} height={30} />
            <span className="text-md font-bold">Entrar com o Google</span>
          </button>
          <button className="flex items-center gap-5 p-5 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors outline-none">
            <Image src={github} alt="github" width={30} height={30} />
            <span className="text-md font-bold">Entrar com o Github</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Root({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 z-10 w-full h-full flex justify-center items-center">
      {children}
    </div>
  );
}

export { Root, Content, Overlay };

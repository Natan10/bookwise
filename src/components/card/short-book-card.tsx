"use client";

import Image from "next/image";
import livro from "@/assets/books/fragmentos-do-horror.png";
import { Stars } from "../stars";

export function ShortBookCard() {
  return (
    <div className="w-[308px] h-[130px] rounded-lg bg-gray-600 border hover:border-gray-600 transition-all">
      <div className="px-5 py-[18px] grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded">
          <Image
            src={livro}
            alt="livro"
            width={64}
            height={94}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2">
          <div className="mb-[34px]">
            <p className="text-gray-100 text-base font-bold">
              Fragmentos de Horror
            </p>
            <p className="text-sm text-gray-400">Junji Ito</p>
          </div>
          <Stars rate={2} />
        </div>
      </div>
    </div>
  );
}

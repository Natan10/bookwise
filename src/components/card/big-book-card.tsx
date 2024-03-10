"use client";

import Image from "next/image";
import livro from "@/assets/books/entendendo-algoritmos.png";
import { Stars } from "../stars";

export function BigBookCard() {
  return (
    <div className="w-[600px] h-[192px] rounded-lg bg-gray-600 hover:bg-gray-500 border hover:border-gray-600 transition-all">
      <div className="px-6 py-5 grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded">
          <Image
            src={livro}
            alt="livro"
            width={108}
            height={152}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-300">Hoje</span>
            <Stars rate={2} />
          </div>
          <div className="mb-[30px]">
            <p className="text-gray-100 text-base font-bold">
              Entendendo Algoritmos
            </p>
            <p className="text-sm text-gray-400">Aditya Bhargava</p>
          </div>
          <p className="text-gray-300 text-sm truncate">
            Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
            Penatibus id vestibulum imperdiet a at imperdiet lectu ssssssss
            sssssssss ssssestibulum imperdiet a at imperdiet lectu ssssssss
            sssssssss ssssestibulum imperdiet a at imperdiet lectu ssssssss
            sssssssss ssss
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Stars } from "../stars";
import * as Avatar from "@/components/avatar";

export function AvatarCard() {
  return (
    <div className="min-w-[608px] h-[280px] p-6 rounded-lg bg-gray-600 transition-all">
      <div className="flex justify-between items-start">
        <Avatar.AvatarRoot>
          <Avatar.AvatarPhoto avatarUrl="https://github.com/natan10.png" />
          <Avatar.AvatarDescription name="Natan" description="Hoje" />
        </Avatar.AvatarRoot>
        <Stars rate={2} />
      </div>

      <div className="mt-8 grid grid-cols-[auto_1fr_1fr] gap-5">
        <div className="rounded">
          <Image
            src={"/images/books/o-guia-do-mochileiro-das-galaxias.png"}
            alt="livro"
            width={108}
            height={152}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2">
          <div className="mb-5">
            <p className="text-gray-100 text-base font-bold">
              Entendendo Algoritmos
            </p>
            <p className="text-sm text-gray-400">Aditya Bhargava</p>
          </div>
          <div className="h-20 flex ">
            <p className="text-gray-300 text-sm text-ellipsis overflow-hidden">
              Nec tempor nunc in egestas. Euismod nisi eleifend at et in
              sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

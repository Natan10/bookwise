import Image from "next/image";
import { Stars } from "../stars";
import { BookOpen, BookmarkSimple } from "@phosphor-icons/react";

export function CommentBookCard() {
  return (
    <div className="px-8 py-6 rounded-[10px] bg-gray-600 border hover:border-gray-600 transition-all">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-8">
        <div className="rounded">
          <Image
            src={"/images/books/o-guia-do-mochileiro-das-galaxias.png"}
            alt={`14 Hábitos de Desenvolvedores Altamente Produtivos`}
            width={200}
            height={172}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="text-gray-100 text-base font-bold truncate">
              14 Hábitos de Desenvolvedores Altamente Produtivos
            </p>
            <p className="text-sm text-gray-400">Zeno Rocha</p>
          </div>

          <div className="mt-auto flex flex-col gap-1">
            <Stars rate={4} />
            <span className="text-gray-400 text-xs">3 avaliações</span>
          </div>
        </div>
      </div>
      <div className="mt-10 p-6 flex justify-between items-center border-t border-t-gray-600">
        <div className="flex items-center gap-4">
          <BookmarkSimple size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Categoria</span>
            <span className="text-gray-200">Computação, educação</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BookOpen size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Páginas</span>
            <span className="text-gray-200">160</span>
          </div>
        </div>
      </div>
    </div>
  );
}

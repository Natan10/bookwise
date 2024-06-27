import Image from "next/image";
import { Stars } from "../stars";
import { BookOpen, BookmarkSimple } from "@phosphor-icons/react";
import { mockOptions } from "@/lib/mock-options";

type CommentBookCardProps = {
  categories: string[];
  title: string;
  author: string;
  pages: number;
  rate: number;
  bookImage: string | null;
};

export function CommentBookCard({
  categories,
  bookImage,
  rate,
  author,
  title,
  pages,
}: CommentBookCardProps) {
  return (
    <div className="px-6 py-4 rounded-[10px] bg-gray-600 border hover:border-gray-600 transition-all">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-8">
        <div className="rounded overflow-hidden">
          <Image
            src={
              bookImage ??
              mockOptions.coverBook[
                Math.floor(Math.random() * mockOptions.coverBook.length)
              ]
            }
            alt={`${title}`}
            width={172}
            height={172}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="text-gray-100 text-base font-bold truncate">
              {title}
            </p>
            <p className="text-sm text-gray-400">{author}</p>
          </div>

          <div className="mt-auto flex flex-col gap-1">
            <Stars rate={rate || 0} />
            <span className="text-gray-400 text-xs">
              {rate || 0} avaliações
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8 p-6 flex justify-between items-center border-t border-t-gray-500">
        <div className="flex items-center gap-4">
          <BookmarkSimple size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Categoria</span>
            <span className="text-gray-200">{categories.join(", ")}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BookOpen size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Páginas</span>
            <span className="text-gray-200">{pages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

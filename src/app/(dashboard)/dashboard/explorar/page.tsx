"use client";

import { Input } from "@/components/input";
import { Tag } from "@/components/tag";
import { Binoculars } from "@phosphor-icons/react";
import { books } from "./seed";
import { ShortBookCard } from "@/components/card/short-book-card";
import { getRandomNumber } from "@/utils/randomRate";

const tags = [
  "Tudo",
  "Computação",
  "Educação",
  "Fantasia",
  "Ficção científica",
  "Horror",
  "HQs",
  "Suspense",
] as const;

export default function Explorar() {
  return (
    <section className="px-[76px] pt-12 pb-7">
      <header className="grid grid-cols-2">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-100" />
          <h1 className="text-gray-100 text-2xl font-bold">Explorar</h1>
        </div>
        <Input placeholder="explorar" />
      </header>

      <div className="mt-10 flex items-center gap-3">
        {tags.map((tag, i) => (
          <Tag key={tag} title={tag} isSelected={i === 0} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-5">
        {books.map((book) => {
          const rate = getRandomNumber(0, 5);
          return (
            <ShortBookCard
              author={book.author}
              rate={rate}
              coverImage={book.cover_url}
              title={book.name}
              key={book.id}
            />
          );
        })}
      </div>
    </section>
  );
}

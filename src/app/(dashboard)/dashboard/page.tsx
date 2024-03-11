"use client";

import Link from "next/link";
import { CaretRight, ChartLineUp } from "@phosphor-icons/react";
import { BigBookCard } from "@/components/card/big-book-card";
import { AvatarCard } from "@/components/card/avatar-card";
import { books } from "./explorar/seed";
import { ShortBookCard } from "@/components/card/short-book-card";
import { getRandomNumber } from "@/utils/randomRate";

export default function Dashboard() {
  return (
    <section className="px-[76px] pt-12 pb-7">
      <header>
        <div className="flex items-center gap-3">
          <ChartLineUp size={32} className="text-green-100" />
          <h1 className="text-gray-100 text-2xl font-bold">Inicio</h1>
        </div>
      </header>
      <div className="mt-10 grid grid-cols-3 gap-16">
        <div className="col-span-2">
          {/* first header */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-100">Sua última leitura</span>
            <Link href={"#"} className="flex items-center gap-2">
              <span className="text-sm text-purple-100">Ver todas</span>
              <CaretRight size={16} className="text-purple-100" />
            </Link>
          </div>
          <div className="mt-4">
            <BigBookCard />
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-sm text-gray-100">Sua última leitura</p>
            <div className="space-y-3">
              <AvatarCard />
              <AvatarCard />
            </div>
          </div>
        </div>

        {/* aside */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-100">Livros populares</span>
            <Link href={"#"} className="flex items-center gap-2">
              <span className="text-sm text-purple-100">Ver todas</span>
              <CaretRight size={16} className="text-purple-100" />
            </Link>
          </div>
          <div className="space-y-3">
            {books.slice(0, 5).map((book) => {
              const rate = getRandomNumber(0, 5);
              return (
                <ShortBookCard
                  key={book.id}
                  author={book.author}
                  title={book.name}
                  coverImage={book.cover_url}
                  rate={rate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

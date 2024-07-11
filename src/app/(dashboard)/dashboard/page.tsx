"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { CaretRight, ChartLineUp } from "@phosphor-icons/react";

import { BigBookCard } from "@/components/card/big-book-card";
import { AvatarCard } from "@/components/card/avatar-card";
import { ShortBookCard } from "@/components/card/short-book-card";
import { Load } from "@/components/load";
import { useGetLastReadBook } from "./hooks/useGetLastReadBook";
import { useGetAvaliations } from "./hooks/useGetAvaliations";
import { useGetMostReadBooks } from "./hooks/useGetMostReadBooks";

export default function Dashboard() {
  const { data: session } = useSession();

  const { data: latestReadBook, isLoading: isLoadingLatestReadBook } =
    useGetLastReadBook({ session });

  const { data: latestAvaliations, isLoading: isLoadingLatestAvaliations } =
    useGetAvaliations();

  const { data: popularBooks, isLoading: isLoadingPopularBooks } =
    useGetMostReadBooks();

  return (
    <section className="px-[76px] pt-12 pb-7">
      <header>
        <div className="flex items-center gap-3">
          <ChartLineUp size={32} className="text-green-100" />
          <h1 className="text-gray-100 text-2xl font-bold">Inicio</h1>
        </div>
      </header>
      <div className="relative mt-10 grid grid-cols-3 gap-16">
        <div className="col-span-2">
          {/* first header */}
          {session && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-100">
                  Sua última leitura
                </span>
                <Link
                  href={"/dashboard/explorar"}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-purple-100">Ver todas</span>
                  <CaretRight size={16} className="text-purple-100" />
                </Link>
              </div>
              <div className="mt-4 mb-10">
                {isLoadingLatestReadBook ? (
                  <div className="p-10 w-full flex justify-center items-center gap-2">
                    <span className="text-sm text-gray-200">
                      Carregando último livro lido...
                    </span>
                    <Load />
                  </div>
                ) : latestReadBook ? (
                  <BigBookCard
                    data={{
                      author: latestReadBook.author,
                      comment: latestReadBook.comment,
                      coverImage: latestReadBook.coverImage,
                      createdAt: latestReadBook.createdAt,
                      rate: latestReadBook.rate,
                      title: latestReadBook.title,
                    }}
                  />
                ) : (
                  <div>
                    <span className="text-sm text-gray-200">
                      Você ainda não possui nenhuma leitura...
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="space-y-4">
            <p className="text-sm text-gray-100">Avaliações mais recentes</p>
            <div className="space-y-3">
              {isLoadingLatestAvaliations && (
                <div className="p-10 w-full flex justify-center items-center gap-2">
                  <span className="text-sm text-gray-200">
                    Carregando últimas avaliações..
                  </span>
                  <Load />
                </div>
              )}
              {latestAvaliations &&
                latestAvaliations.map((avaliation) => (
                  <AvatarCard key={avaliation.id} avaliation={avaliation} />
                ))}
            </div>
          </div>
        </div>

        {/* aside */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-100">Livros populares</span>
            <Link
              href={"/dashboard/explorar"}
              className="flex items-center gap-2"
            >
              <span className="text-sm text-purple-100">Ver todas</span>
              <CaretRight size={16} className="text-purple-100" />
            </Link>
          </div>
          <div className="sticky top-0 pt-3 space-y-3">
            {isLoadingPopularBooks ? (
              <div className="p-10 w-full flex justify-center items-center gap-2">
                <span className="text-sm text-gray-200">
                  Carregando livros populares...
                </span>
                <Load />
              </div>
            ) : popularBooks ? (
              popularBooks.map((book) => {
                return (
                  <ShortBookCard
                    id={+book.id}
                    key={book.id}
                    author={book.author}
                    title={book.title}
                    coverImage={book.coverImage}
                    rate={book.averageMedia ? Number(book.averageMedia) : 0}
                  />
                );
              })
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

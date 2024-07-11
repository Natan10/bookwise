"use client";

import { useState } from "react";
import { User } from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";

import { ProfileCard } from "@/components/card/profile-card";
import { Input } from "@/components/input";
import { ProfileInfo } from "./components/profile-info";
import { Load } from "@/components/load";
import { AvaliationBookProfileDto } from "./dtos/avaliation-book-profile-dto";
import { useGetProfileBooks } from "./hooks/useGetProfileBooks";

export default function Profile() {
  const { data: session } = useSession();
  const { data, isLoading } = useGetProfileBooks({ session });
  const [searchBookTerm, setSearchBookTerm] = useState("");

  const filterBooks = data?.filter((book: AvaliationBookProfileDto) => {
    if (book.bookAuthor?.toUpperCase().includes(searchBookTerm.toUpperCase()))
      return book;
    if (book.bookTitle?.toUpperCase().includes(searchBookTerm.toUpperCase()))
      return book;
    if (book.comment.toUpperCase().includes(searchBookTerm.toUpperCase()))
      return book;
  });

  return (
    <section className="px-[76px] pt-12 pb-7">
      <header>
        <div className="flex items-center gap-3">
          <User size={32} className="text-green-100" />
          <h1 className="text-gray-100 text-2xl font-bold">Perfil</h1>
        </div>
      </header>

      <div className="pt-10 grid grid-cols-3">
        {/* cards */}
        <div className="col-span-2">
          <Input
            placeholder="Buscar livro avaliado"
            onChange={(e) => setSearchBookTerm(e.target.value)}
          />

          <div className="mt-8 space-y-6 h-screen overflow-y-auto scrollbar-hide">
            {isLoading && (
              <div className="w-full h-screen flex justify-center items-center gap-3">
                <Load />
                <span className="text-sm text-gray-200">Carregando...</span>
              </div>
            )}

            {filterBooks?.map((d) => {
              const distance = formatDistanceToNow(d.createdAt!, {
                addSuffix: true,
              });
              return (
                <div className="space-y-2" key={d.id}>
                  <span className="text-gray-300 text-sm">{distance}</span>
                  <ProfileCard
                    title={d.bookTitle!}
                    author={d.bookAuthor!}
                    comment={d.comment}
                    coverImage={d.bookCover}
                    rate={d.rate}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <ProfileInfo />
      </div>
    </section>
  );
}

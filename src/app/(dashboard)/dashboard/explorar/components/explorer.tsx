"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/input";
import { Tag } from "@/components/tag";
import { Binoculars } from "@phosphor-icons/react";
import { ShortBookCard } from "@/components/card/short-book-card";
import * as Comment from "@/components/comment";
import { Category } from "@/models/category/category";
import { getBooksByCategory } from "../_actions";
import { Load } from "@/components/load";

type ExplorerProps = {
  categories: Category[];
};

export function Explorer({ categories }: ExplorerProps) {
  const [searchBookTerm, setSearchBookTerm] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryType = searchParams.get("category");

  const { data: books, isLoading } = useQuery({
    queryKey: ["books_by_category", categoryType],
    queryFn: async () => {
      const books = await getBooksByCategory(categoryType);
      return books;
    },
  });

  function handleCategory(category: string) {
    if (categoryType && categoryType === category) {
      router.push(`${pathname}`);
      return;
    }
    const urlParams = new URLSearchParams();
    urlParams.set("category", category);
    router.push(`${pathname}?${urlParams.toString()}`);
  }

  const filterBooks = books?.filter((book) => {
    if (book.author.toUpperCase().includes(searchBookTerm.toUpperCase()))
      return book;
    if (book.description?.toUpperCase().includes(searchBookTerm.toUpperCase()))
      return book;
    if (book.title.toUpperCase().includes(searchBookTerm.toUpperCase()))
      return book;
  });

  return (
    <section className="px-[76px] pt-12 pb-7">
      <header className="grid grid-cols-2">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-100" />
          <h1 className="text-gray-100 text-2xl font-bold">Explorar</h1>
        </div>
        <Input
          placeholder="explorar"
          onChange={(e) => setSearchBookTerm(e.target.value)}
        />
      </header>

      <div className="mt-10 flex items-center gap-3">
        {categories.map(({ id, type }) => (
          <Tag
            key={`${id}-${type}`}
            title={type}
            onSelectCategory={handleCategory}
            isSelected={categoryType === type}
          />
        ))}
      </div>

      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center gap-3">
          <Load />
          <span className="text-sm text-gray-200">Carregando...</span>
        </div>
      )}

      <div className="mt-12 grid grid-cols-3 gap-5">
        {filterBooks?.map((book) => {
          return (
            <ShortBookCard
              author={book.author}
              rate={book.rate}
              coverImage={book.coverImage}
              title={book.title}
              key={book.id}
            />
          );
        })}
      </div>

      {/* <Comment.CommentRoot>
        <Comment.CommentClose />
        <Comment.CommentBookCard />
        <Comment.CommentAvaliationTrigger />

        <div className="space-y-3">
          <Comment.CommentAvaliationInput />
          <Comment.CommentAvaliationCard />
          <Comment.CommentAvaliationCard />
          <Comment.CommentAvaliationCard />
        </div>
      </Comment.CommentRoot> */}
    </section>
  );
}

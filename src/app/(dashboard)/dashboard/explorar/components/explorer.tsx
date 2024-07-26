'use client';

import { Binoculars } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { ShortBookCard } from '@/components/card/short-book-card';
import { CommentSection } from '@/components/comment/comment-section';
import { Input } from '@/components/input';
import { Load } from '@/components/load';
import { Tag } from '@/components/tag';
import { Category } from '@/models/category/category';

import { getBooksByCategory } from '../_actions';

type ExplorerProps = {
  categories: Category[];
};

export function Explorer({ categories }: ExplorerProps) {
  const [searchBookTerm, setSearchBookTerm] = useState('');
  const [bookId, setBookId] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryType = searchParams.get('category');

  const { data: books, isLoading } = useQuery({
    queryKey: ['books_by_category', categoryType],
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
    urlParams.set('category', category);
    router.push(`${pathname}?${urlParams.toString()}`);
  }

  const filterBooks = books?.filter((book: any) => {
    if (book.author.toUpperCase().includes(searchBookTerm.toUpperCase())) return book;
    if (book.description?.toUpperCase().includes(searchBookTerm.toUpperCase())) return book;
    if (book.title.toUpperCase().includes(searchBookTerm.toUpperCase())) return book;
  });

  return (
    <section className="px-[76px] pb-7 pt-12">
      <header className="grid grid-cols-2">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-100" />
          <h1 className="text-2xl font-bold text-gray-100">Explorar</h1>
        </div>
        <Input placeholder="explorar" onChange={(e) => setSearchBookTerm(e.target.value)} />
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
        <div className="flex h-screen w-full items-center justify-center gap-3">
          <span className="text-sm text-gray-200">Carregando...</span>
          <Load />
        </div>
      )}

      <div className="mt-12 grid grid-cols-3 gap-5">
        {filterBooks?.map((book: any) => {
          return (
            <ShortBookCard
              id={book.id}
              author={book.author}
              rate={book.rate}
              coverImage={book.coverImage}
              title={book.title}
              key={book.id}
              selectBook={setBookId}
            />
          );
        })}
      </div>

      <CommentSection bookId={bookId} close={() => setBookId(null)} />
    </section>
  );
}

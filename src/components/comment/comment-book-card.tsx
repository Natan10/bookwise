import { BookmarkSimple, BookOpen } from '@phosphor-icons/react';
import Image from 'next/image';

import bannerBook from '@/assets/banner_book.svg';

import { Stars } from '../stars';

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
    <div className="rounded-[10px] border bg-gray-600 px-6 py-4 transition-all hover:border-gray-600">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-8">
        <div className="overflow-hidden rounded">
          <Image
            src={bookImage ?? bannerBook}
            alt={`${title}`}
            width={142}
            height={200}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="truncate text-base font-bold text-gray-100">{title}</p>
            <p className="text-sm text-gray-400">{author}</p>
          </div>

          <div className="mt-auto flex flex-col gap-1">
            <Stars rate={rate || 0} />
            <span className="text-xs text-gray-400">{rate || 0} avaliações</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-t-gray-500 p-6">
        <div className="flex items-center gap-4">
          <BookmarkSimple size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-300">Categoria</span>
            <span className="text-gray-200">{categories.join(', ')}</span>
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

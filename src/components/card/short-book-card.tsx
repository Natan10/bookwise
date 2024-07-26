'use client';

import Image from 'next/image';

import { Stars } from '../stars';
import bannerBook from '@/assets/banner_book.svg';

type ShortBookCardProps = {
  id: number;
  coverImage: string | null;
  title: string;
  author: string;
  rate: number;
  selectBook?: (bookId: number) => void;
};

export function ShortBookCard({
  id,
  coverImage,
  author,
  title,
  rate,
  selectBook,
}: ShortBookCardProps) {
  return (
    <div
      role="button"
      onClick={() => selectBook?.(id)}
      className="h-[130px] rounded-lg border border-gray-600 bg-gray-600 transition-all hover:border-gray-500"
    >
      <div className="grid grid-cols-[auto_1fr_1fr] gap-6 px-5 py-[18px]">
        <div className="overflow-hidden rounded">
          <Image
            src={coverImage ?? bannerBook}
            alt={`${title}`}
            width={64}
            height={94}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="col-span-2">
          <div className="mb-[34px]">
            <p className="truncate text-base font-bold text-gray-100">{title}</p>
            <p className="truncate text-sm text-gray-400">{author}</p>
          </div>
          <Stars rate={rate} />
        </div>
      </div>
    </div>
  );
}

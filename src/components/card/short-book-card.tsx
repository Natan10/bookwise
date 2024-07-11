"use client";

import Image from "next/image";

import { Stars } from "../stars";
import bannerBook from "@/assets/banner_book.svg";

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
      className="h-[130px] rounded-lg bg-gray-600 border border-gray-600 hover:border-gray-500 transition-all"
    >
      <div className="px-5 py-[18px] grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded overflow-hidden">
          <Image
            src={coverImage ?? bannerBook}
            alt={`${title}`}
            width={64}
            height={94}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2">
          <div className="mb-[34px]">
            <p className="text-gray-100 text-base font-bold truncate">
              {title}
            </p>
            <p className="text-sm text-gray-400 truncate">{author}</p>
          </div>
          <Stars rate={rate} />
        </div>
      </div>
    </div>
  );
}

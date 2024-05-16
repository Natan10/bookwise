"use client";

import Image from "next/image";
import { Stars } from "../stars";

type ShortBookCardProps = {
  coverImage: string | null;
  title: string;
  author: string;
  rate: number;
};

export function ShortBookCard({
  coverImage,
  author,
  title,
  rate,
}: ShortBookCardProps) {
  return (
    <div className="h-[130px] rounded-lg bg-gray-600 border border-gray-600 hover:border-gray-500 transition-all">
      <div className="px-5 py-[18px] grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`${title}`}
              width={64}
              height={94}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="h-full w-16 bg-gray-400" />
          )}
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

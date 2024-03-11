"use client";

import Image from "next/image";
import { Stars } from "../stars";

type ShortBookCardProps = {
  coverImage: string;
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
    <div className="min-w-[308px] h-[130px] rounded-lg bg-gray-600 border hover:border-gray-600 transition-all">
      <div className="px-5 py-[18px] grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded">
          <Image
            src={coverImage}
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
            <p className="text-sm text-gray-400">{author}</p>
          </div>
          <Stars rate={rate} />
        </div>
      </div>
    </div>
  );
}

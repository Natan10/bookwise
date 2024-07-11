import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { Stars } from "../stars";
import { LastBookReadInfoDto } from "@/app/(dashboard)/dashboard/dtos/last-book-read-info-dto";
import bannerBook from "@/assets/banner_book.svg";

type BigBookCardProps = {
  data: LastBookReadInfoDto;
};

export function BigBookCard({
  data: { author, rate, comment, coverImage, title, createdAt },
}: BigBookCardProps) {
  const distance = formatDistanceToNow(createdAt ?? new Date(), {
    addSuffix: true,
  });

  return (
    <div className="h-[192px] rounded-lg bg-gray-600 hover:bg-gray-500/75 border border-gray-600 hover:border-gray-500 transition-all">
      <div className="px-6 py-5 grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded">
          <Image
            src={coverImage ?? bannerBook}
            alt={title}
            width={108}
            height={152}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-300">{distance}</span>
            <Stars rate={rate} />
          </div>
          <div className="mb-[30px]">
            <p className="text-gray-100 text-base font-bold">{title}</p>
            <p className="text-sm text-gray-400">{author}</p>
          </div>
          <p className="text-gray-300 text-sm truncate">{comment}</p>
        </div>
      </div>
    </div>
  );
}

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

import { LastBookReadInfoDto } from '@/app/(dashboard)/dashboard/dtos/last-book-read-info-dto';
import bannerBook from '@/assets/banner_book.svg';

import { Stars } from '../stars';

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
    <div className="h-[192px] rounded-lg border border-gray-600 bg-gray-600 transition-all hover:border-gray-500 hover:bg-gray-500/75">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-6 px-6 py-5">
        <div className="rounded">
          <Image
            src={coverImage ?? bannerBook}
            alt={title}
            width={108}
            height={152}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-gray-300">{distance}</span>
            <Stars rate={rate} />
          </div>
          <div className="mb-[30px]">
            <p className="text-base font-bold text-gray-100">{title}</p>
            <p className="text-sm text-gray-400">{author}</p>
          </div>
          <p className="truncate text-sm text-gray-300">{comment}</p>
        </div>
      </div>
    </div>
  );
}

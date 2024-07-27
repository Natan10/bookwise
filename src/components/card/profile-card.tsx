import Image from 'next/image';

import bannerBook from '@/assets/banner_book.svg';

import { Stars } from '../stars';

type ProfileCardProps = {
  coverImage: string | null;
  title: string;
  author: string;
  rate: number;
  comment: string;
};

export function ProfileCard({ author, comment, coverImage, rate, title }: ProfileCardProps) {
  return (
    <div className="max-h-[360px] rounded-lg bg-gray-600 p-6 transition-all">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="overflow-hidden rounded">
          <Image
            src={coverImage ?? bannerBook}
            alt="livro"
            width={108}
            height={152}
            style={{ objectFit: 'contain', overflow: 'hidden' }}
          />
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-[2px]">
            <p className="text-lg font-bold text-gray-100">{title}</p>
            <span className="text-sm text-gray-400">{author}</span>
          </div>
          <div className="mx-auto">
            <Stars rate={rate} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-300">{comment}</p>
      </div>
    </div>
  );
}

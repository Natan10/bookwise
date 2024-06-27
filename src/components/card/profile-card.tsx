import Image from "next/image";
import { Stars } from "../stars";
import { mockOptions } from "@/lib/mock-options";

type ProfileCardProps = {
  coverImage: string | null;
  title: string;
  author: string;
  rate: number;
  comment: string;
};

export function ProfileCard({
  author,
  comment,
  coverImage,
  rate,
  title,
}: ProfileCardProps) {
  return (
    <div className="max-h-[360px] p-6 rounded-lg bg-gray-600 transition-all">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded overflow-hidden">
          <Image
            src={coverImage ?? mockOptions.coverBook}
            alt="livro"
            width={108}
            height={152}
            style={{ objectFit: "contain", overflow: "hidden" }}
          />
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-[2px]">
            <p className="text-gray-100 text-lg font-bold">{title}</p>
            <span className="text-gray-400 text-sm">{author}</span>
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

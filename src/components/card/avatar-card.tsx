import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { Stars } from "../stars";
import * as Avatar from "@/components/avatar";
import { LastAvaliationDto } from "@/app/(dashboard)/dashboard/dtos/last-avaliation-dto";
import bannerBook from "@/assets/banner_book.svg";

type AvatarCardProps = {
  avaliation: LastAvaliationDto;
};

export function AvatarCard({ avaliation }: AvatarCardProps) {
  const profileUrl =
    avaliation.profile?.avatar ||
    "https://doodleipsum.com/700x933/avatar?i=236f057bf1e40dc8090b96d71dbb4f65";

  const distance = formatDistanceToNow(avaliation.createdAt!, {
    addSuffix: true,
  });

  return (
    <div className="h-[280px] p-6 rounded-lg bg-gray-600 transition-all">
      <div className="flex justify-between items-start">
        <Avatar.AvatarRoot>
          <Avatar.AvatarPhoto avatarUrl={profileUrl} />
          <Avatar.AvatarDescription
            name={
              avaliation.profile?.username ||
              avaliation.profile?.email ||
              "Sem dado"
            }
            description={distance}
          />
        </Avatar.AvatarRoot>
        <Stars rate={avaliation.rate} />
      </div>

      <div className="mt-8 grid grid-cols-[auto_1fr_1fr] gap-5">
        <div className="rounded">
          <Image
            src={avaliation.book.coverImage ?? bannerBook}
            alt="livro"
            width={108}
            height={152}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2">
          <div className="mb-5">
            <p className="text-gray-100 text-base font-bold">
              {avaliation.book.title}
            </p>
            <p className="text-sm text-gray-400">{avaliation.book.author}</p>
          </div>
          <div className="h-20 flex ">
            <p className="text-gray-300 text-sm text-ellipsis overflow-hidden">
              {avaliation.comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  BookOpen,
  BookmarkSimple,
  Books,
  UserList,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";

import { AvatarPhoto } from "@/components/avatar";
import { useGetProfileInfo } from "../hooks/useGetProfileInfo";

export function ProfileInfo() {
  const { data: session } = useSession();
  const { data } = useGetProfileInfo({ session });

  return (
    <div className="ml-16">
      <div className="border-l border-gray-700">
        <div className="flex flex-col items-center justify-center gap-5">
          <AvatarPhoto
            avatarUrl={
              session?.user?.image ||
              "https://doodleipsum.com/700/avatar?i=8cb73ce685d8071fc7374ccd71072c5d"
            }
            type="lg"
          />
          <div className="text-center">
            <p className="text-gray-100 text-xl">{session?.user?.name}</p>
            <span className="text-gray-400 text-sm">
              member since {data?.memberSince}
            </span>
          </div>
        </div>

        <div className="my-8 flex justify-center">
          <div className="w-8 h-1 rounded-full bg-gradient-horizontal" />
        </div>

        <div className="flex flex-col items-center">
          <div className="space-y-10">
            <div className="flex items-center gap-5">
              <BookOpen size={32} className="text-green-100" />
              <div className="flex flex-col">
                <span className="text-gray-100 font-bold">
                  {data?.totalPagesRead}
                </span>
                <span className="text-gray-300 text-sm">Páginas lidas</span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Books size={32} className="text-green-100" />
              <div className="flex flex-col">
                <span className="text-gray-100 font-bold">
                  {data?.readBooks}
                </span>
                <span className="text-gray-300 text-sm">Livros avaliados</span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <UserList size={32} className="text-green-100" />
              <div className="flex flex-col">
                <span className="text-gray-100 font-bold">
                  {data?.distinctAuthors}
                </span>
                <span className="text-gray-300 text-sm">Autores lidos</span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <BookmarkSimple size={32} className="text-green-100" />
              <div className="flex flex-col">
                <span className="text-gray-100 font-bold">
                  {data?.mostReadCategory}
                </span>
                <span className="text-gray-300 text-sm">
                  Categoria mais lida
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

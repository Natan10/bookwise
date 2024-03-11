"use client";

import { ProfileCard } from "@/components/card/profile-card";
import { Input } from "@/components/input";
import {
  BookOpen,
  BookmarkSimple,
  Books,
  User,
  UserList,
} from "@phosphor-icons/react";
import { AvatarPhoto } from "@/components/avatar";

export default function Profile() {
  return (
    <section className="px-[76px] pt-12 pb-7">
      <header>
        <div className="flex items-center gap-3">
          <User size={32} className="text-green-100" />
          <h1 className="text-gray-100 text-2xl font-bold">Perfil</h1>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-3">
        {/* cards */}
        <div className="col-span-2">
          <Input placeholder="Buscar livro avaliado" />
          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <span className="text-gray-300 text-sm">Há 2 dias</span>
              <ProfileCard />
            </div>
            <div className="space-y-2">
              <span className="text-gray-300 text-sm">Há 4 meses</span>
              <ProfileCard />
            </div>
          </div>
        </div>

        {/* profile */}
        <div className="ml-16 ">
          <div className="border-l border-gray-700/10">
            <div className="flex flex-col items-center justify-center gap-5">
              <AvatarPhoto
                avatarUrl="https://github.com/natan10.png"
                type="lg"
              />
              <div className="text-center">
                <p className="text-gray-100 text-xl">Natan lemos</p>
                <span className="text-gray-400 text-sm">membro desde 2024</span>
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
                    <span className="text-gray-100 font-bold">3853</span>
                    <span className="text-gray-300 text-sm">Páginas lidas</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <Books size={32} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-gray-100 font-bold">10</span>
                    <span className="text-gray-300 text-sm">
                      Livros avaliados
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <UserList size={32} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-gray-100 font-bold">8</span>
                    <span className="text-gray-300 text-sm">Autores lidos</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <BookmarkSimple size={32} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-gray-100 font-bold">Computação</span>
                    <span className="text-gray-300 text-sm">
                      Categoria mais lida
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

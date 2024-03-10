"use client";

import Image from "next/image";
import Link from "next/link";
import { ElementType } from "react";
import { Binoculars, ChartLineUp, SignOut, User } from "@phosphor-icons/react";
import bookHeart from "@/assets/icons/book-heart.svg";

export function NavigationSidebar() {
  return (
    <aside className="flex p-5">
      <nav className="w-[232px] flex flex-col pt-10 px-12 pb-6 bg-gray-700 rounded-xl shadow-xl">
        <div className="flex items-center gap-2">
          <Image src={bookHeart} alt="bookHeart" width={24} height={24} />
          <h1 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-horizontal">
            BookWise
          </h1>
        </div>

        <div className="mt-16 h-full flex flex-col gap-4">
          <LinkItem active icon={ChartLineUp} path="#" title="Inicio" />
          <LinkItem title="Explorar" icon={Binoculars} path="#" />
          <LinkItem icon={User} path="#" title="Perfil" />
        </div>

        <div>
          <div className="mt-auto flex items-center gap-3">
            <span className="font-bold text-base">Fazer login</span>
            <button>
              <SignOut size={20} className="text-green-100" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function LinkItem({
  path,
  title,
  active = false,
  icon: Icon,
}: {
  path: string;
  title: string;
  active?: boolean;
  icon: ElementType;
}) {
  return (
    <Link href={path} className="group" data-active={active}>
      <div className="flex items-center gap-3">
        <div className="group-data-[active=true]:bg-gradient-vertical h-6 w-1 rounded-full bg-transparent" />
        <Icon
          size={18}
          className="text-gray-400 group-hover:text-gray-100 group-data-[active=true]:text-gray-100"
        />
        <span className="text-gray-400 text-base group-hover:text-gray-100 group-data-[active=true]:font-bold group-data-[active=true]:text-gray-100">
          {title}
        </span>
      </div>
    </Link>
  );
}

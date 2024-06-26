"use client";

import { ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Binoculars, ChartLineUp, SignOut, User } from "@phosphor-icons/react";

import bookHeart from "@/assets/icons/book-heart.svg";

export function NavigationSidebar() {
  const { data: session } = useSession();
  const router = useRouter();

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
          <LinkItem icon={ChartLineUp} path="/dashboard" title="Inicio" />
          <LinkItem
            title="Explorar"
            icon={Binoculars}
            path="/dashboard/explorar"
          />
          <LinkItem icon={User} path="#" title="Perfil" />
        </div>

        <div>
          {session ? (
            <div className="grid grid-cols-3 items-center gap-3">
              <div className="relative flex-0 flex items-center justify-center size-9 bg-gradient-vertical rounded-full">
                <Image
                  src={"https://github.com/natan10.png"}
                  alt="perfil"
                  width={32}
                  height={32}
                  className="rounded-full"
                  style={{ objectFit: "contain" }}
                />
              </div>

              <p className="text-center text-gray-200 text-xs max-w-14 text-ellipsis overflow-hidden">
                {session.user?.name}
              </p>

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "http://localhost:3000/login",
                  })
                }
                className="flex justify-end"
              >
                <SignOut size={20} className="text-[#F75A68]" />
              </button>
            </div>
          ) : (
            <div className="mt-auto flex items-center gap-3">
              <span className="font-bold text-base text-gray-200">
                Fazer login
              </span>
              <button onClick={() => router.push("/login")}>
                <SignOut size={20} className="text-green-100" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

function LinkItem({
  path,
  title,
  icon: Icon,
}: {
  path: string;
  title: string;
  icon: ElementType;
}) {
  const pathname = usePathname();
  const isActive = pathname.endsWith(`${path}`);

  return (
    <Link href={path} className="group" data-active={isActive}>
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

'use client';

import { ElementType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Binoculars, ChartLineUp, SignOut, User } from '@phosphor-icons/react';

import bookHeart from '@/assets/icons/book-heart.svg';

export function NavigationSidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <aside className="flex p-5">
      <nav className="flex w-[232px] flex-col rounded-xl bg-gray-700 px-12 pb-6 pt-10 shadow-xl">
        <div className="flex items-center gap-2">
          <Image src={bookHeart} alt="bookHeart" width={24} height={24} />
          <h1 className="bg-gradient-horizontal bg-clip-text text-xl font-bold text-transparent">
            BookWise
          </h1>
        </div>

        <div className="mt-16 flex h-full flex-col gap-4">
          <LinkItem icon={ChartLineUp} path="/dashboard" title="Inicio" />
          <LinkItem title="Explorar" icon={Binoculars} path="/dashboard/explorar" />
          <LinkItem icon={User} path="/dashboard/profile" title="Perfil" />
        </div>

        <div>
          {session ? (
            <div className="grid grid-cols-3 items-center gap-3">
              <div className="flex-0 relative flex size-9 items-center justify-center rounded-full bg-gradient-vertical">
                <Image
                  src={
                    session.user?.image ||
                    'https://doodleipsum.com/700/avatar?i=8cb73ce685d8071fc7374ccd71072c5d'
                  }
                  alt="perfil"
                  width={32}
                  height={32}
                  className="rounded-full"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <p className="max-w-14 overflow-hidden text-ellipsis text-center text-xs text-gray-200">
                {session.user?.name}
              </p>

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: 'http://localhost:3000/login',
                  })
                }
                className="flex justify-end"
              >
                <SignOut size={20} className="text-[#F75A68]" />
              </button>
            </div>
          ) : (
            <div className="mt-auto flex items-center gap-3">
              <span className="text-base font-bold text-gray-200">Fazer login</span>
              <button onClick={() => router.push('/login')}>
                <SignOut size={20} className="text-green-100" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

function LinkItem({ path, title, icon: Icon }: { path: string; title: string; icon: ElementType }) {
  const pathname = usePathname();
  const isActive = pathname.endsWith(`${path}`);

  return (
    <Link href={path} className="group" data-active={isActive}>
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 rounded-full bg-transparent group-data-[active=true]:bg-gradient-vertical" />
        <Icon
          size={18}
          className="text-gray-400 group-hover:text-gray-100 group-data-[active=true]:text-gray-100"
        />
        <span className="text-base text-gray-400 group-hover:text-gray-100 group-data-[active=true]:font-bold group-data-[active=true]:text-gray-100">
          {title}
        </span>
      </div>
    </Link>
  );
}

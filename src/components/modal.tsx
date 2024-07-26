import { ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
import { signIn } from 'next-auth/react';

import github from '@/assets/icons/github.svg';
import google from '@/assets/icons/google.svg';
import { SocialLoginButton } from './buttons/social-login-btn';

function Content({ close }: { close: () => void }) {
  return (
    <div className="relative flex h-[337px] w-[516px] items-center justify-center rounded-xl bg-gray-700 px-[72px] py-14">
      <button onClick={close} className="absolute right-4 top-4">
        <X size={24} className="text-gray-400" />
      </button>
      <div>
        <p className="text-center font-bold text-gray-200">Faça login para deixar sua avaliação</p>
        <div className="mt-10 flex flex-col gap-4">
          <SocialLoginButton
            image={google}
            title="Entrar com o Google"
            fn={() =>
              signIn('google', {
                callbackUrl: 'http://localhost:3000/dashboard/explorar',
              })
            }
          />
          <SocialLoginButton
            image={github}
            title="Entrar com o Github"
            fn={() =>
              signIn('github', {
                callbackUrl: 'http://localhost:3000/dashboard/explorar',
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

function Root({ overlay = true, children }: { overlay?: boolean; children: ReactNode }) {
  return (
    <div
      className={`absolute inset-0 z-10 h-full w-full ${
        overlay && 'bg-black/60'
      } flex items-center justify-center`}
    >
      {children}
    </div>
  );
}

export function Modal({ overlay, close }: { overlay?: boolean; close: () => void }) {
  return (
    <Root overlay={overlay}>
      <Content close={close} />
    </Root>
  );
}

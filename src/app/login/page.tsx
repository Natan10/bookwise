'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import github from '@/assets/icons/github.svg';
import google from '@/assets/icons/google.svg';
import rocket from '@/assets/icons/rocket.svg';
import login from '@/assets/login.svg';
import { SocialLoginButton } from '@/components/buttons/social-login-btn';
import { env } from '@/infra/env';

export default function Login() {
  const router = useRouter();
  function signInWithoutCredentials() {
    router.push('/dashboard');
  }

  return (
    <main className="h-full bg-gray-800">
      <section className="grid h-full grid-cols-2 p-5">
        <div className="relative overflow-hidden rounded-[10px]">
          <Image src={login} alt="login" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-10 flex w-[372px] flex-col justify-start">
            <h1 className="text-xl/8 font-bold text-gray-100">Boas vindas!</h1>
            <h2 className="text-sm/10 text-gray-200">Faça seu login ou acesse como visitante.</h2>
          </div>
          <div className="flex w-[372px] flex-col gap-5">
            <SocialLoginButton
              image={google}
              title="Entrar com o Google"
              fn={() =>
                signIn('google', {
                  callbackUrl: `${env.NEXT_PUBLIC_LOGIN_REDIRECT_URL}/dashboard`,
                })
              }
            />
            <SocialLoginButton
              image={github}
              title="Entrar com o Github"
              fn={() =>
                signIn('github', {
                  callbackUrl: `${env.NEXT_PUBLIC_LOGIN_REDIRECT_URL}/dashboard`,
                })
              }
            />
            <SocialLoginButton
              image={rocket}
              title="Acessar como visitante"
              fn={() => signInWithoutCredentials()}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

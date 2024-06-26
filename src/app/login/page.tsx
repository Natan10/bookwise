"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { SocialLoginButton } from "@/components/buttons/social-login-btn";

import login from "@/assets/login.svg";
import github from "@/assets/icons/github.svg";
import google from "@/assets/icons/google.svg";
import rocket from "@/assets/icons/rocket.svg";

export default function Login() {
  const router = useRouter();
  function signInWithoutCredentials() {
    router.push("/dashboard");
  }

  return (
    <main className="h-full bg-gray-800">
      <section className="h-full p-5 grid grid-cols-2">
        <div className="relative rounded-[10px] overflow-hidden">
          <Image src={login} alt="login" fill style={{ objectFit: "cover" }} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-10 w-[372px] flex flex-col justify-start">
            <h1 className="font-bold text-xl/8 text-gray-100">Boas vindas!</h1>
            <h2 className="text-sm/10 text-gray-200">
              Faça seu login ou acesse como visitante.
            </h2>
          </div>
          <div className="w-[372px] flex flex-col gap-5">
            <SocialLoginButton
              image={google}
              title="Entrar com o Google"
              fn={() =>
                signIn("google", {
                  callbackUrl: "http://localhost:3000/dashboard",
                })
              }
            />
            <SocialLoginButton
              image={github}
              title="Entrar com o Github"
              fn={() =>
                signIn("github", {
                  callbackUrl: "http://localhost:3000/dashboard",
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

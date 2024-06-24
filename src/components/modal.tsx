import { ReactNode } from "react";
import { X } from "@phosphor-icons/react";

import github from "@/assets/icons/github.svg";
import google from "@/assets/icons/google.svg";
import { SocialLoginButton } from "./buttons/social-login-btn";

function Content({ close }: { close: () => void }) {
  return (
    <div className="relative flex items-center justify-center w-[516px] h-[337px] py-14 px-[72px] bg-gray-700 rounded-xl">
      <button onClick={close} className="absolute top-4 right-4">
        <X size={24} className="text-gray-400" />
      </button>
      <div>
        <p className="text-gray-200 text-center font-bold">
          Faça login para deixar sua avaliação
        </p>
        <div className="mt-10 flex flex-col gap-4">
          <SocialLoginButton image={google} title="Entrar com o Google" />
          <SocialLoginButton image={github} title="Entrar com o Github" />
        </div>
      </div>
    </div>
  );
}

function Root({
  overlay = true,
  children,
}: {
  overlay?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 z-10 w-full h-full ${
        overlay && "bg-black/60"
      } flex justify-center items-center`}
    >
      {children}
    </div>
  );
}

export function Modal({
  overlay,
  close,
}: {
  overlay?: boolean;
  close: () => void;
}) {
  return (
    <Root overlay={overlay}>
      <Content close={close} />
    </Root>
  );
}

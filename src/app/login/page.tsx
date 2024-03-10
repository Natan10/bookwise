import Image from "next/image";

import login from "@/assets/login.svg";
import github from "@/assets/icons/github.svg";
import google from "@/assets/icons/google.svg";
import rocket from "@/assets/icons/rocket.svg";

export default function Login() {
  return (
    <main className="h-full bg-gray-800">
      <section className="h-full p-5 grid grid-cols-2">
        <div className="w-full relative">
          <Image src={login} alt="login" fill />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mb-10 w-[372px] flex flex-col justify-start">
            <h1 className="font-bold text-xl/8">Boas vindas!</h1>
            <h2 className="text-sm/10">
              Faça seu login ou acesse como visitante.
            </h2>
          </div>
          <div className="w-[372px] flex flex-col gap-5">
            <button className="flex items-center gap-5 p-5 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors outline-none">
              <Image src={google} alt="google" width={30} height={30} />
              <span className="text-md font-bold">Entrar com o Google</span>
            </button>
            <button className="flex items-center gap-5 p-5 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors outline-none">
              <Image src={github} alt="github" width={30} height={30} />
              <span className="text-md font-bold">Entrar com o Github</span>
            </button>
            <button className="flex items-center gap-5 p-5 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors outline-none">
              <Image src={rocket} alt="rocket" width={30} height={30} />
              <span className="text-md font-bold">Acessar como visitante</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import { Stars } from "../stars";

export function ProfileCard() {
  return (
    <div className="max-h-[360px] p-6 rounded-lg bg-gray-600 transition-all">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
        <div className="rounded">
          <Image
            src={"/images/books/o-guia-do-mochileiro-das-galaxias.png"}
            alt="livro"
            width={108}
            height={152}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-[2px]">
            <p className="text-gray-100 text-lg font-bold">
              Entendendo Algoritmos
            </p>
            <span className="text-gray-400 text-sm">Aditya Bhargava</span>
          </div>
          <div className="mx-auto">
            <Stars rate={3} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          officia illo vitae. Animi fugit fuga molestiae dicta tempore
          repudiandae fugiat cupiditate, officia quo quaerat, exercitationem, a
          alias aliquam praesentium numquam?
        </p>
      </div>
    </div>
  );
}

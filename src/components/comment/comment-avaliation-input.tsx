import { Check, Star, X } from "@phosphor-icons/react";
import * as Avatar from "../avatar";

export function CommentAvaliationInput() {
  return (
    <div className="p-6 rounded-lg bg-gray-600 border hover:border-gray-600 transition-all">
      <div className="flex justify-between items-center">
        <Avatar.AvatarRoot>
          <Avatar.AvatarPhoto
            avatarUrl="https://github.com/natan10.png"
            type="md"
          />
          <Avatar.AvatarDescription name="Natan lemos" />
        </Avatar.AvatarRoot>
        <div className="flex items-center gap-1">
          <Star size={28} className="text-purple-100" />
          <Star size={28} className="text-purple-100" />
          <Star size={28} className="text-purple-100" />
          <Star size={28} className="text-purple-100" />
          <Star size={28} className="text-purple-100" />
        </div>
      </div>
      <div className="mt-5">
        <div className="relative h-[164px]">
          <textarea
            className="w-full h-full outline-none bg-transparent rounded border border-purple-200 focus:border-green-100 active:border-green-100 py-[14px] px-5 placeholder:text-gray-500 placeholder:text-sm resize-none"
            id="comment"
            placeholder="Escreva sua avaliação"
            maxLength={450}
            rows={2}
          />
          <span className="absolute bottom-3 right-3 text-xs text-gray-600">
            0/450
          </span>
        </div>
        <div className="mt-3 flex justify-end items-center gap-2">
          <button className="bg-gray-500 flex items-center justify-center rounded p-2 ">
            <X size={24} className="text-purple-100" />
          </button>
          <button className="bg-gray-500 flex items-center justify-center rounded p-2 ">
            <Check size={24} className="text-green-100" />
          </button>
        </div>
      </div>
    </div>
  );
}

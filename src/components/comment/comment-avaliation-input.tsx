import { Check, CircleNotch, Star, X } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";

import * as Avatar from "../avatar";
import { CommentRateInput } from "./comment-rate-input";

export function CommentAvaliationInput({
  onSendComment,
  isLoading,
  comment,
  setComment,
}: {
  onSendComment: (comment: string, rate: number) => Promise<void>;
  setComment: (data: string) => void;
  isLoading: boolean;
  comment: string;
}) {
  const [rate, setRate] = useState(0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSendComment(comment, rate);
    setRate(0);
  }

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
        <CommentRateInput rate={rate} setRate={setRate} />
      </div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="relative h-[164px]">
          <textarea
            className={`
            w-full h-full outline-none bg-transparent rounded border border-purple-200 focus:border-green-100 active:border-green-100 
            py-[14px] px-5 placeholder:text-gray-500 placeholder:text-sm resize-none
            text-sm font-nsans text-gray-200
          `}
            id="comment"
            placeholder="Escreva sua avaliação"
            maxLength={450}
            rows={2}
            disabled={isLoading}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <span className="absolute bottom-3 right-3 text-xs text-gray-600">
            0/450
          </span>
        </div>
        <div className="mt-3 flex justify-end items-center gap-2">
          <button
            disabled={isLoading}
            className="bg-gray-500 flex items-center justify-center rounded p-2 "
            type="button"
          >
            {isLoading ? (
              <CircleNotch size={24} className="text-white animate-spin" />
            ) : (
              <X size={24} className="text-purple-100" />
            )}
          </button>
          <button
            disabled={isLoading}
            className="bg-gray-500 flex items-center justify-center rounded p-2"
            type="submit"
          >
            {isLoading ? (
              <CircleNotch size={24} className="text-white animate-spin" />
            ) : (
              <Check size={24} className="text-green-100" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

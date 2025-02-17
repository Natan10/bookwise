import { Check, CircleNotch, X } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

import * as Avatar from '../avatar';
import { CommentRateInput } from './comment-rate-input';

export function CommentAvaliationInput({
  onSendComment,
  isLoading,
  close,
}: {
  onSendComment: (comment: string, rate: number) => Promise<void>;
  isLoading: boolean;
  close: () => void;
}) {
  const { data: session } = useSession();
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await onSendComment(comment, rate);
    setRate(0);
    setComment('');
  }

  return (
    <div className="rounded-lg border bg-gray-600 p-6 transition-all hover:border-gray-600">
      <div className="flex items-center justify-between">
        <Avatar.AvatarRoot>
          <Avatar.AvatarPhoto
            avatarUrl={
              session?.user?.image ||
              'https://doodleipsum.com/700/avatar?i=8cb73ce685d8071fc7374ccd71072c5d'
            }
            type="md"
          />
          <Avatar.AvatarDescription name={session?.user?.name || session?.user?.email || ''} />
        </Avatar.AvatarRoot>
        <CommentRateInput rate={rate} setRate={setRate} />
      </div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="relative h-[164px]">
          <textarea
            className={`h-full w-full resize-none rounded border border-purple-200 bg-transparent px-5 py-[14px] font-nsans text-sm text-gray-200 outline-none placeholder:text-sm placeholder:text-gray-500 focus:border-green-100 active:border-green-100`}
            id="comment"
            placeholder="Escreva sua avaliação"
            maxLength={450}
            rows={2}
            disabled={isLoading}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <span className="absolute bottom-3 right-3 text-xs text-gray-600">0/450</span>
        </div>
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            disabled={isLoading}
            className="flex items-center justify-center rounded bg-gray-500 p-2"
            onClick={close}
            type="button"
          >
            {isLoading ? (
              <CircleNotch size={24} className="animate-spin text-white" />
            ) : (
              <X size={24} className="text-purple-100" />
            )}
          </button>
          <button
            disabled={isLoading}
            className="flex items-center justify-center rounded bg-gray-500 p-2"
            type="submit"
          >
            {isLoading ? (
              <CircleNotch size={24} className="animate-spin text-white" />
            ) : (
              <Check size={24} className="text-green-100" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

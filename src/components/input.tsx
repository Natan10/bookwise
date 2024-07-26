'use client';

import { MagnifyingGlass } from '@phosphor-icons/react';
import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

export function Input(props: InputProps) {
  return (
    <div
      className={`group flex items-center gap-2 rounded border border-purple-100 px-5 py-[14px] has-[:focus]:border-green-100`}
    >
      <input
        className={`peer flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-400`}
        {...props}
      />
      <MagnifyingGlass size={20} className="text-purple-100 peer-[:focus]:text-green-100" />
    </div>
  );
}

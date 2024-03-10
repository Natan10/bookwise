"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export function Input(props: InputProps) {
  return (
    <div
      className={`
      group
      py-[14px] px-5 flex items-center gap-2 
      rounded border border-purple-100 has-[:focus]:border-green-100
    `}
    >
      <input
        className={`
        peer
        flex-1 bg-transparent outline-none
        text-sm text-gray-200 placeholder:text-gray-400
      `}
        {...props}
      />
      <MagnifyingGlass
        size={20}
        className="peer-[:focus]:text-green-100 text-purple-100"
      />
    </div>
  );
}

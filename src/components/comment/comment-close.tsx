import { X } from "@phosphor-icons/react";
import { ComponentProps } from "react";

export type CommentCloseProps = ComponentProps<"button">;

export function CommentClose(props: CommentCloseProps) {
  return (
    <div className="flex justify-end mb-4">
      <button
        className={`flex justify-end items-center ${props.className}`}
        {...props}
      >
        <X size={24} className="text-gray-400" />
      </button>
    </div>
  );
}

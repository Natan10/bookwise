import { X } from '@phosphor-icons/react';
import { ComponentProps } from 'react';

export type CommentCloseProps = ComponentProps<'button'>;

export function CommentClose(props: CommentCloseProps) {
  return (
    <div className="mb-4 flex justify-end">
      <button className={`flex items-center justify-end ${props.className}`} {...props}>
        <X size={24} className="text-gray-400" />
      </button>
    </div>
  );
}

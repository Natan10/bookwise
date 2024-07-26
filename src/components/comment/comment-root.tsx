import { ReactNode } from 'react';

export function CommentRoot({ children }: { children: ReactNode }) {
  return (
    <div id="kapa" className="fixed inset-0 z-50 flex justify-end bg-black/60">
      <div className="h-full w-[660px] overflow-y-auto bg-gray-700 px-12 py-6">{children}</div>
    </div>
  );
}

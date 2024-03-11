import { ReactNode } from "react";

export function CommentRoot({ children }: { children: ReactNode }) {
  return (
    <div id="kapa" className="fixed inset-0 z-50 bg-black/60 flex justify-end">
      <div className="bg-gray-700 w-[660px] h-full px-12 py-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

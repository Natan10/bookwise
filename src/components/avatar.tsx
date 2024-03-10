import { ReactNode } from "react";
import Image from "next/image";
import { SignOut } from "@phosphor-icons/react";

function AvatarRoot({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-4">{children}</div>;
}

type AvatarProps = {
  profileName: string;
  avatarUrl: string;
};

function AvatarPhoto({ avatarUrl }: AvatarProps) {
  return (
    <div className="flex justify-center items-center size-10 rounded-full bg-gradient-vertical">
      <Image
        src={avatarUrl}
        alt="avatar-profile"
        width={38}
        height={38}
        className="rounded-full"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

function AvatarDescription({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-[2px]">
      <span className="text-base text-gray-100">{name}</span>
      {description && <span className="text-gray-400">{description}</span>}
    </div>
  );
}

function AvatarIcon() {
  return (
    <button>
      <SignOut size={20} className="text-[#F75A68]" />
    </button>
  );
}

export { AvatarDescription, AvatarPhoto, AvatarRoot, AvatarIcon };

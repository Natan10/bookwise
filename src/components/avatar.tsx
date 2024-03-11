import { ReactNode } from "react";
import Image from "next/image";
import { SignOut } from "@phosphor-icons/react";

function AvatarRoot({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-4">{children}</div>;
}

type AvatarProps = {
  type?: "sm" | "md" | "lg";
  avatarUrl: string;
};

function AvatarPhoto({ avatarUrl, type = "md" }: AvatarProps) {
  function getImageSize() {
    if (type === "sm") {
      return 30;
    } else if (type === "md") {
      return 38;
    } else {
      return 78;
    }
  }

  function getContainerSize() {
    if (type === "sm") {
      return 8;
    } else if (type === "md") {
      return 10;
    } else {
      return 20;
    }
  }

  const size = getImageSize();
  const containerSize = getContainerSize();

  return (
    <div
      className={`flex justify-center items-center size-${containerSize} rounded-full bg-gradient-vertical`}
    >
      <Image
        src={avatarUrl}
        alt="avatar-profile"
        width={size}
        height={size}
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

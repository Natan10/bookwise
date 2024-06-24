import Image from "next/image";

export function SocialLoginButton({
  image,
  title,
  fn,
}: {
  image: string;
  title: string;
  fn?: () => void;
}) {
  return (
    <button
      onClick={fn}
      className="flex items-center gap-5 p-5 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors outline-none"
    >
      <Image src={image} alt="google" width={30} height={30} />
      <span className="text-gray-200 text-md font-bold">{title}</span>
    </button>
  );
}

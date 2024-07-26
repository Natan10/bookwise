import Image from 'next/image';

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
      className="flex items-center gap-5 rounded-lg bg-gray-600 p-5 outline-none transition-colors hover:bg-gray-500"
    >
      <Image src={image} alt="google" width={30} height={30} />
      <span className="text-md font-bold text-gray-200">{title}</span>
    </button>
  );
}

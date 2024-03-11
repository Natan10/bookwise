import * as Avatar from "../avatar";
import { Stars } from "../stars";

export function CommentAvaliationCard() {
  return (
    <div className="p-6 rounded-lg bg-gray-600 border hover:border-gray-600 transition-all">
      <div className="flex justify-between items-start">
        <Avatar.AvatarRoot>
          <Avatar.AvatarPhoto
            avatarUrl="https://github.com/natan10.png"
            type="md"
          />
          <Avatar.AvatarDescription
            name="Natan lemos"
            description="Há 2 dias"
          />
        </Avatar.AvatarRoot>
        <Stars rate={4} />
      </div>
      <div className="mt-5">
        <p className="text-gray-300 text-sm">
          Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
          Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
          eget nec vitae sit vulputate eget
        </p>
      </div>
    </div>
  );
}

import { Star } from '@phosphor-icons/react';

import * as Avatar from '../avatar';
import { CommentCardDto } from './dtos/comment-card-dto';

type CommentAvaliationCardProps = CommentCardDto;

export function CommentAvaliationCard({
  comment,
  commentData,
  profile,
  rate,
}: CommentAvaliationCardProps) {
  const formattedData = commentData?.toLocaleDateString('pt-br', {
    hour: 'numeric',
    minute: 'numeric',
    month: '2-digit',
    year: '2-digit',
    day: '2-digit',
  });

  const avatarUrl =
    profile?.avatar || 'https://doodleipsum.com/700x933/avatar?i=236f057bf1e40dc8090b96d71dbb4f65';

  return (
    <div className="rounded-lg border bg-gray-600 p-6 transition-all hover:border-gray-600">
      <div className="flex justify-between">
        <div className="flex items-start justify-between">
          <Avatar.AvatarRoot>
            <Avatar.AvatarPhoto avatarUrl={avatarUrl} type="md" />
            <Avatar.AvatarDescription
              name={profile?.username || profile?.email || ''}
              description={formattedData}
            />
          </Avatar.AvatarRoot>
        </div>
        <div className="flex items-center gap-1">
          {new Array(5).fill(0).map((_, index) => {
            if (rate > index) {
              return <Star key={index} weight="fill" size={16} className="text-purple-100" />;
            }
            return <Star key={index} size={16} className="text-purple-100" />;
          })}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm text-gray-300">{comment}</p>
      </div>
    </div>
  );
}

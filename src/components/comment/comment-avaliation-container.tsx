import { CommentAvaliationCard } from './comment-avaliation-card';
import { CommentCardDto } from './dtos/comment-card-dto';

export function CommentAvaliationContainer({ comments }: { comments: CommentCardDto[] }) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentAvaliationCard
          key={comment.id}
          id={comment.id}
          rate={comment.rate}
          commentData={comment.commentData}
          comment={comment.comment}
          profile={comment.profile}
        />
      ))}
    </div>
  );
}

export type CommentCardDto = {
  id: number;
  comment: string;
  rate: number;
  commentData: Date | null;
  profile: {
    username: string | null;
    email: string;
    avatar: string | null;
  } | null;
};

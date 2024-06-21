export type Avaliation = {
  id: number;
  comment: string;
  bookId: number;
  profileId: number;
  profile?: {
    email: string;
    username: string | null;
    avatar: string | null;
  } | null;
  rate: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};

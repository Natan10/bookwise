export type Comment = {
  id: number;
  comment: string;
  profileId: number;
  bookId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};

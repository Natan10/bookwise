export type Rating = {
  id: number;
  rate: number;
  profileId: number;
  bookId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
};

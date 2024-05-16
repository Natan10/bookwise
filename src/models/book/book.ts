export interface Book {
  id: number;
  title: string;
  author: string;
  numOfPages: number;
  coverImage: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

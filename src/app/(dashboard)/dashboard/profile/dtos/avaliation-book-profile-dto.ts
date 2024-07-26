import { Avaliation } from '@/models/avaliation';

export type AvaliationBookProfileDto = Avaliation & {
  bookTitle: string | null;
  bookCover: string | null;
  bookAuthor: string | null;
};

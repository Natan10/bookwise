import { Book } from '@/models/book/book';
import { Avaliation } from '@/models/avaliation';

export type BookInfoDto = Book & {
  average: number;
  categories: string[];
  avaliations: Avaliation[];
};

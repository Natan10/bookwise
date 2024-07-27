import { Avaliation } from '@/models/avaliation';
import { Book } from '@/models/book/book';

export type BookInfoDto = Book & {
  average: number;
  categories: string[];
  avaliations: Avaliation[];
};

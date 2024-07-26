import { Avaliation } from '@/models/avaliation';

export type LastAvaliationDto = Avaliation & {
  book: {
    title: string;
    author: string;
    coverImage: string | null;
  };
};

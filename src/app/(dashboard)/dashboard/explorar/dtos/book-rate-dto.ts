import { Book } from "@/models/book/book";

export type BookWithRateDto = Book & {
  rate: number;
};

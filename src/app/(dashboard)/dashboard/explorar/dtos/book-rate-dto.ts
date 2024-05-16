import { Book } from "@/models/book/book";

export type BookWithRate = Book & {
  rate: number;
};

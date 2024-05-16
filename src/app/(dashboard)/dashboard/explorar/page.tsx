import { Explorer } from "./components/explorer";
import { getAllBooksWithRatings } from "@/data/queries/books-queries";
import { BookWithRate } from "./dtos/book-rate-dto";

export default async function Explorar() {
  const books = await getAllBooksWithRatings();

  return <Explorer books={books as BookWithRate[]} />;
}

import { books, ratings } from "@/infra/database/schema";
import { db } from "@/infra/database/client";
import { eq } from "drizzle-orm";

// query books

type DictRating = {
  [bookId: number]: number[];
};

export async function getAllBooksWithRatings() {
  const results = await db
    .select()
    .from(books)
    .leftJoin(ratings, eq(books.id, ratings.bookId));

  const dict: DictRating = {};

  return results
    .map(({ books, ratings }) => {
      if (dict[books.id]) {
        dict[books.id].push(ratings ? ratings.rate! : 0);
      } else {
        dict[books.id] = ratings ? [ratings.rate!] : [0];
      }
      return { books, ratings };
    })
    .map(({ books }) => {
      const rate = getAverageRating(dict[books.id]) || 0;

      return {
        ...books,
        rate,
      };
    });
}

function getAverageRating(data: number[]) {
  if (!data.length) return 0; // Handle empty array

  // Clip values to the 0-5 range
  const adjustedData = data.map((value) => Math.max(0, Math.min(5, value)));

  // Calculate the average of the adjusted data
  const sum = adjustedData.reduce((acc, val) => acc + val, 0);
  const average = sum / adjustedData.length;

  return Math.ceil(average);
}

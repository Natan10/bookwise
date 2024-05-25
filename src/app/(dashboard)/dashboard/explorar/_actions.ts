"use server";

import { eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/infra/database/client";
import {
  categories,
  books,
  ratings,
  categories_to_books,
} from "@/infra/database/schema";
import { BookWithRate } from "./dtos/book-rate-dto";

export async function getBooksByCategory(categoryType: string | null) {
  let categoryId: number | null = null;

  if (categoryType) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.type, categoryType),
    });
    if (!category) throw new Error("Category not found");
    categoryId = category.id;
  }

  const query = db
    .select({
      ...getTableColumns(books),
      rate: sql<number>`COALESCE(SUM(${ratings.rate}), 0)`,
    })
    .from(books)
    .leftJoin(categories_to_books, eq(books.id, categories_to_books.bookId))
    .leftJoin(ratings, eq(books.id, ratings.bookId))
    .groupBy(books.id);

  if (categoryId) {
    query.where(eq(categories_to_books.categoryId, categoryId));
  }

  const data = await query;
  return data.map((book) => {
    return {
      id: book.id,
      author: book.author,
      coverImage: book.coverImage,
      description: book.description,
      numOfPages: book.numOfPages,
      title: book.title,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      rate: +book.rate,
    } as BookWithRate;
  });
}

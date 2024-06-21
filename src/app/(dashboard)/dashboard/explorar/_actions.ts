"use server";

import { and, eq, getTableColumns, sql } from "drizzle-orm";

import { db } from "@/infra/database/client";
import {
  categories,
  books,
  categories_to_books,
  avaliations,
} from "@/infra/database/schema";
import { BookWithRateDto } from "./dtos/book-rate-dto";
import { BookInfoDto } from "./dtos/book-info-dto";

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
      rate: sql<number>`avg(${avaliations.rate})`,
    })
    .from(books)
    .leftJoin(categories_to_books, eq(books.id, categories_to_books.bookId))
    .leftJoin(avaliations, eq(avaliations.bookId, books.id))
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
    } as BookWithRateDto;
  });
}

export async function getBookById(bookId: number) {
  const book = await db.query.books.findFirst({
    where: (books, { eq }) => eq(books.id, bookId),
    with: {
      avaliations: {
        orderBy: (avaliations, { desc }) => [desc(avaliations.createdAt)],
        with: {
          profile: true,
        },
      },
      categories: true,
    },
  });

  if (!book) throw new Error("Book not found");

  let categoryTypes = await Promise.all(
    book.categories.map(async (e) => {
      const category = await db.query.categories.findFirst({
        where: (categories, { eq }) => eq(categories.id, e.categoryId),
      });
      if (category) return category.type;
      return "";
    })
  );

  const [bookAverage] = await db
    .select({ averageRate: sql`avg(${avaliations.rate})` })
    .from(avaliations)
    .where(eq(avaliations.bookId, book.id));
  const average = bookAverage.averageRate
    ? (bookAverage.averageRate as number)
    : 0;

  const data: BookInfoDto = {
    ...book,
    avaliations: book.avaliations,
    categories: categoryTypes,
    average,
  };
  return data;
}

export async function addComment({
  profileId,
  bookId,
  comment,
  rate,
}: {
  bookId: number;
  profileId: number;
  comment: string;
  rate: number;
}) {
  await db.transaction(async (tx) => {
    // check profile

    // check book
    const book = await tx.query.books.findFirst({
      where: (books, { eq }) => eq(books.id, bookId),
    });

    if (!book) throw new Error("Book not found");
    if (rate < 0) throw new Error("Rate not allowed");
    if (!comment) throw new Error("Comment not allowed");

    const avaliationComment = await tx.query.avaliations.findFirst({
      where: (avaliations, { eq }) => eq(avaliations.profileId, profileId),
    });

    if (avaliationComment) {
      await tx
        .delete(avaliations)
        .where(
          and(
            eq(avaliations.bookId, book.id),
            eq(avaliations.profileId, profileId)
          )
        );
    }

    await tx.insert(avaliations).values({
      bookId: book.id,
      comment: comment,
      rate: rate,
      profileId: profileId,
    });
  });
}

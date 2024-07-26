'use server';

import { and, avg, eq, getTableColumns, sql } from 'drizzle-orm';

import { db } from '@/infra/database/neon-client';
import {
  avaliations,
  books,
  categories,
  categories_to_books,
  profiles,
} from '@/infra/database/schema';

import { BookInfoDto } from './dtos/book-info-dto';
import { BookWithRateDto } from './dtos/book-rate-dto';

export async function getBooksByCategory(categoryType: string | null) {
  let categoryId: number | null = null;

  if (categoryType) {
    const category = await db.query.categories.findFirst({
      where: eq(categories.type, categoryType),
    });
    if (!category) throw new Error('Category not found');
    categoryId = category.id;
  }

  const query: any = db
    .select({
      ...getTableColumns(books),
      rate: avg(avaliations.rate),
    })
    .from(books)
    .leftJoin(categories_to_books, eq(books.id, categories_to_books.bookId))
    .leftJoin(avaliations, eq(avaliations.bookId, books.id))
    .groupBy(books.id);

  if (categoryId) {
    query.where(eq(categories_to_books.categoryId, categoryId));
  }

  const data = await query;
  return data.map((book: any) => {
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

  if (!book) throw new Error('Book not found');

  const categoryTypes = await Promise.all(
    book.categories.map(async (e) => {
      const category = await db.query.categories.findFirst({
        where: (categories, { eq }) => eq(categories.id, e.categoryId),
      });
      if (category) return category.type;
      return '';
    }),
  );

  const [bookAverage] = await db
    .select({ averageRate: sql`avg(${avaliations.rate})` })
    .from(avaliations)
    .where(eq(avaliations.bookId, book.id));
  const average = bookAverage.averageRate ? (bookAverage.averageRate as number) : 0;

  const data: BookInfoDto = {
    ...book,
    avaliations: book.avaliations,
    categories: categoryTypes,
    average,
  };
  return data;
}

export async function addComment({
  profile,
  bookId,
  comment,
  rate,
}: {
  bookId: number;
  profile: {
    email: string;
    username?: string;
    avatar?: string;
  } | null;
  comment: string;
  rate: number;
}) {
  await db.transaction(async (tx) => {
    if (!profile) {
      throw new Error('User not exist');
    }

    // check profile
    let record = await tx.query.profiles.findFirst({
      where: eq(profiles.email, profile.email),
    });

    if (!record) {
      [record] = await tx
        .insert(profiles)
        .values({
          email: profile.email,
          avatar: profile.avatar,
          username: profile.username,
        })
        .returning();
    }

    // check book
    const book = await tx.query.books.findFirst({
      where: (books, { eq }) => eq(books.id, bookId),
    });

    if (!book) throw new Error('Book not found');
    if (rate < 0) throw new Error('Rate not allowed');
    if (!comment) throw new Error('Comment not allowed');

    const avaliationComment = await tx.query.avaliations.findFirst({
      where: (avaliations, { eq }) => eq(avaliations.profileId, record.id),
    });

    if (avaliationComment) {
      await tx
        .delete(avaliations)
        .where(and(eq(avaliations.bookId, book.id), eq(avaliations.profileId, record.id)));
    }

    await tx.insert(avaliations).values({
      bookId: book.id,
      comment: comment,
      rate: rate,
      profileId: record.id,
    });
  });
}

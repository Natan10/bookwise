'use server';

import { getYear } from 'date-fns';
import { count, desc, eq, getTableColumns, sql, sum } from 'drizzle-orm';

import { profileDataProcedure } from '@/app/procedures/profile-procedure';
import { db } from '@/infra/database/neon-client';
import {
  avaliations,
  books,
  categories,
  categories_to_books,
  profiles,
} from '@/infra/database/schema';

import { AvaliationBookProfileDto } from './dtos/avaliation-book-profile-dto';
import { ProfileStatsDto } from './dtos/profile-stats-dto';

export const getProfileBooks = profileDataProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { email } = ctx;
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.email, email),
    });

    if (!profile) throw new Error('Profile does not exist');

    const reviewedBooks = await db
      .select({
        bookTitle: books.title,
        bookCover: books.coverImage,
        bookAuthor: books.author,
        ...getTableColumns(avaliations),
      })
      .from(avaliations)
      .leftJoin(books, eq(books.id, avaliations.bookId))
      .where(eq(avaliations.profileId, profile.id));
    return reviewedBooks as AvaliationBookProfileDto[];
  });

export const getProfileInfoStats = profileDataProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { email } = ctx;
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.email, email),
    });

    if (!profile) throw new Error('Profile does not exist');

    const stats = await db
      .select({
        totalPagesRead: sum(books.numOfPages),
        distinctAuthors: sql<number>`count(distinct ${books.author})`.as('distinct_authors'),
        readBooks: count(),
      })
      .from(books)
      .innerJoin(avaliations, eq(books.id, avaliations.bookId))
      .where(eq(avaliations.profileId, profile.id));

    const categoryStats = await db
      .select({
        categoryName: categories.type,
        readCount: sql<number>`count(*)`.as('read_count'),
      })
      .from(avaliations)
      .innerJoin(books, eq(avaliations.bookId, books.id))
      .innerJoin(categories_to_books, eq(categories_to_books.bookId, books.id))
      .innerJoin(categories, eq(categories.id, categories_to_books.categoryId))
      .where(eq(avaliations.profileId, profile.id))
      .groupBy(categories.type)
      .orderBy(desc(sql`read_count`))
      .limit(1);

    const year = getYear(profile.createdAt || new Date());

    return {
      distinctAuthors: stats[0].distinctAuthors,
      totalPagesRead: +stats[0].totalPagesRead!,
      mostReadCategory: categoryStats[0].categoryName,
      readBooks: stats[0].readBooks,
      memberSince: year,
    } satisfies ProfileStatsDto;
  });

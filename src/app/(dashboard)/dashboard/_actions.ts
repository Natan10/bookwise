"use server";

import { avg, desc, eq, getTableColumns } from "drizzle-orm";

import { avaliations, books, profiles } from "@/infra/database/schema";
import { db } from "@/infra/database/neon-client";
import { LastAvaliationDto } from "@/app/(dashboard)/dashboard/dtos/last-avaliation-dto";
import { LastBookReadInfoDto } from "@/app/(dashboard)/dashboard/dtos/last-book-read-info-dto";
import { PopularBookDto } from "@/app/(dashboard)/dashboard/dtos/popular-book-dto";

export async function getLastBookRead({ email }: { email: string }) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.email, email),
  });

  if (!profile) throw new Error("Profile does not exist");

  const [content] = await db
    .select({
      rate: avaliations.rate,
      comment: avaliations.comment,
      createdAt: avaliations.createdAt,
      title: books.title,
      author: books.author,
      coverImage: books.coverImage,
    })
    .from(avaliations)
    .innerJoin(books, eq(books.id, avaliations.bookId))
    .where(eq(avaliations.profileId, profile.id))
    .orderBy(desc(books.id))
    .limit(1);

  return content satisfies LastBookReadInfoDto;
}

export async function getLatestAvaliations() {
  const latestAvaliations = await db
    .select({
      ...getTableColumns(avaliations),
      profile: getTableColumns(profiles),
      book: {
        title: books.title,
        coverImage: books.coverImage,
        author: books.author,
      },
    })
    .from(avaliations)
    .innerJoin(books, eq(books.id, avaliations.bookId))
    .innerJoin(profiles, eq(avaliations.profileId, profiles.id))
    .orderBy(desc(avaliations.createdAt))
    .limit(5);

  return latestAvaliations as LastAvaliationDto[];
}

export async function getPopularBooks() {
  const info = await db
    .select({
      averageMedia: avg(avaliations.rate),
      id: books.id,
      title: books.title,
      author: books.author,
      coverImage: books.coverImage,
    })
    .from(avaliations)
    .innerJoin(books, eq(books.id, avaliations.bookId))
    .groupBy(books.id, avaliations.rate)
    .orderBy(desc(avaliations.rate))
    .limit(4);

  if (!info.length) {
    const mostReadBooks = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        coverImage: books.coverImage,
      })
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(3);

    return mostReadBooks as PopularBookDto[];
  }

  return info as PopularBookDto[];
}

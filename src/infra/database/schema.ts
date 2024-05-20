import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  serial,
  char,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey().unique(),
  type: text("type").unique().notNull(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey().unique(),
  author: char("author", { length: 256 }).notNull(),
  title: text("title").notNull(),
  coverImage: text("cover_image"),
  numOfPages: integer("num_of_pages").notNull().default(0),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey().unique(),
  email: text("email").notNull().unique(),
  username: text("username"),
  avatar: text("avatar"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey().unique(),
  rate: integer("rate").notNull(),
  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const comments = pgTable("commments", {
  id: serial("id").primaryKey().unique(),
  comment: text("comment", {}).notNull(),
  ratingId: integer("rating_id")
    .references(() => ratings.id, { onDelete: "cascade" })
    .notNull(),
  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => {
  return {
    books: many(categories_to_books),
  };
});

export const booksRelations = relations(books, ({ many }) => {
  return {
    categories: many(categories_to_books),
    ratings: many(ratings),
    comments: many(comments),
  };
});

export const categories_to_books = pgTable(
  "categories_to_books",
  {
    bookId: integer("book_id")
      .notNull()
      .references(() => books.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.bookId, t.categoryId] }),
  })
);

export const categoriesToBooksRelations = relations(
  categories_to_books,
  ({ one }) => {
    return {
      book: one(books, {
        fields: [categories_to_books.bookId],
        references: [books.id],
      }),
      category: one(categories, {
        fields: [categories_to_books.categoryId],
        references: [categories.id],
      }),
    };
  }
);

export const ratingsRelations = relations(ratings, ({ many, one }) => {
  return {
    comments: many(comments),
    profile: one(profiles, {
      references: [profiles.id],
      fields: [ratings.profileId],
    }),
    book: one(books, {
      references: [books.id],
      fields: [ratings.bookId],
    }),
  };
});

export const commentsRelations = relations(comments, ({ one }) => {
  return {
    rating: one(ratings, {
      fields: [comments.ratingId],
      references: [ratings.id],
    }),
    book: one(books, {
      fields: [comments.bookId],
      references: [books.id],
    }),
  };
});

/*
  Categories
    - type    
  Book 
    - title
    - description
    - author
    - pages
    - categories
    - profile
  Profile
    - email
    - name
    - avatar
    - password
  ReadBooks
    - profile
    - book
    - isRead
  Rating
    - book
    - profile
    - rate
    - commments
*/

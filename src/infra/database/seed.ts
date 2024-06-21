import * as schema from "./schema";
import { db } from "./client";

// const books = [
//   {
//     author: "J.R.R. Tolkien",
//     title: "The Lord of the Rings: The Fellowship of the Ring",
//     num_of_pages: 544,
//     description:
//       "An epic high fantasy adventure about a hobbit who inherits a powerful ring and embarks on a quest to destroy it.",
//   },
//   {
//     author: "George R.R. Martin",
//     title: "A Game of Thrones",
//     num_of_pages: 694,
//     description:
//       "The first book in the A Song of Ice and Fire series, following several noble families in a civil war for control of the Iron Throne.",
//   },
//   {
//     author: "Harper Lee",
//     title: "To Kill a Mockingbird",
//     num_of_pages: 324,
//     description:
//       "A coming-of-age story set in the Deep South during the 1930s, narrated by a young girl named Scout Finch.",
//   },
//   {
//     author: "Margaret Atwood",
//     title: "The Handmaid's Tale",
//     num_of_pages: 348,
//     description:
//       "A dystopian novel set in a future America where women are forced into servitude as childbearers.",
//   },
//   {
//     author: "Gabriel García Márquez",
//     title: "One Hundred Years of Solitude",
//     num_of_pages: 472,
//     description:
//       "A magical realist novel that chronicles the rise and fall of the Buendía family and the fictional town of Macondo.",
//   },
//   {
//     author: "Leo Tolstoy",
//     title: "War and Peace",
//     num_of_pages: 1225,
//     description:
//       "A historical novel that follows five aristocratic families in Russia during the Napoleonic Wars.",
//   },
//   {
//     author: "F. Scott Fitzgerald",
//     title: "The Great Gatsby",
//     num_of_pages: 180,
//     description:
//       "A novel about the wealthy lifestyle and moral decay of the Jazz Age in America.",
//   },
//   {
//     author: "Jane Austen",
//     title: "Pride and Prejudice",
//     num_of_pages: 224,
//     description:
//       "A classic novel of manners and romance set in England during the Regency era.",
//   },
//   {
//     author: "Victor Hugo",
//     title: "Les Misérables",
//     num_of_pages: 1534,
//     description:
//       "An epic historical novel set in early 19th-century France, following the struggles of Jean Valjean, a former convict.",
//   },
//   {
//     author: "Charles Dickens",
//     title: "A Tale of Two Cities",
//     num_of_pages: 256,
//     description:
//       "A historical novel set in London and Paris before and during the French Revolution.",
//   },
// ];

const books = [
  {
    id: 1,
    author: "George Orwell",
    title: "1984",
    coverImage: "https://example.com/images/1984.jpg",
    numOfPages: 328,
    description:
      "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 2,
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    coverImage: "https://example.com/images/mockingbird.jpg",
    numOfPages: 281,
    description:
      "A novel about the serious issues of rape and racial inequality.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 3,
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer's Stone",
    coverImage: "https://example.com/images/harrypotter.jpg",
    numOfPages: 309,
    description: "The first novel in the Harry Potter series.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 4,
    author: "J.R.R. Tolkien",
    title: "The Hobbit",
    coverImage: "https://example.com/images/thehobbit.jpg",
    numOfPages: 310,
    description:
      "A fantasy novel and children's book by English author J.R.R. Tolkien.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 5,
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    coverImage: "https://example.com/images/gatsby.jpg",
    numOfPages: 180,
    description: "A novel set in the Jazz Age on Long Island.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 6,
    author: "Herman Melville",
    title: "Moby Dick",
    coverImage: "https://example.com/images/mobydick.jpg",
    numOfPages: 635,
    description: "A novel about the voyage of the whaling ship Pequod.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 7,
    author: "Jane Austen",
    title: "Pride and Prejudice",
    coverImage: "https://example.com/images/prideandprejudice.jpg",
    numOfPages: 432,
    description: "A romantic novel of manners written by Jane Austen.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 8,
    author: "Mark Twain",
    title: "The Adventures of Huckleberry Finn",
    coverImage: "https://example.com/images/huckleberryfinn.jpg",
    numOfPages: 366,
    description: "A novel about a young boy named Huck and his adventures.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 9,
    author: "Leo Tolstoy",
    title: "War and Peace",
    coverImage: "https://example.com/images/warandpeace.jpg",
    numOfPages: 1225,
    description:
      "A novel that chronicles the history of the French invasion of Russia.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
  {
    id: 10,
    author: "Mary Shelley",
    title: "Frankenstein",
    coverImage: "https://example.com/images/frankenstein.jpg",
    numOfPages: 280,
    description:
      "A novel about a young scientist who creates a grotesque creature.",
    createdAt: "2024-05-16T00:00:00Z",
    updatedAt: "2024-05-16T00:00:00Z",
  },
];

const categories = [
  {
    id: 1,
    type: "Dystopian",
    bookIds: [1],
  },
  {
    id: 2,
    type: "Classic",
    bookIds: [2, 5, 7],
  },
  {
    id: 3,
    type: "Fantasy",
    bookIds: [3, 4],
  },
  {
    id: 4,
    type: "Adventure",
    bookIds: [6, 8],
  },
  {
    id: 5,
    type: "Historical",
    bookIds: [9],
  },
  {
    id: 6,
    type: "Horror",
    bookIds: [10],
  },
];

async function seedDb() {
  console.log("Running seeds...");

  // const booksInserts = books.map(async (book) => {
  //   return db.insert(schema.books).values({
  //     author: book.author,
  //     title: book.title,
  //     numOfPages: book.numOfPages,
  //     description: book.description,
  //   });
  // });

  // return Promise.all(booksInserts);

  // const categoriesInserts = categories.map(async (category) => {
  //   return await db.insert(schema.categories).values({
  //     id: category.id,
  //     type: category.type,
  //   });
  // });

  // return Promise.all(categoriesInserts);

  const categoryAndBookRelationInserts = categories.map(async (category) => {
    const bookIds = category.bookIds;
    return bookIds.map(async (bookId) => {
      return await db.insert(schema.categories_to_books).values({
        bookId,
        categoryId: category.id,
      });
    });
  });

  return Promise.all(categoryAndBookRelationInserts);
}

seedDb()
  .then(() => console.log("Registros criados com sucesso!"))
  .catch(() => "Erro ao popular database!")
  .finally(() => {
    return;
  });

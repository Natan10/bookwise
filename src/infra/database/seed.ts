import * as schema from './schema';
import { db } from './neon-client';

const books = [
  {
    id: 1,
    author: 'George Orwell',
    title: '1984',
    coverImage: 'https://example.com/images/1984.jpg',
    numOfPages: 328,
    description:
      'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 2,
    author: 'Harper Lee',
    title: 'To Kill a Mockingbird',
    coverImage: 'https://example.com/images/mockingbird.jpg',
    numOfPages: 281,
    description: 'A novel about the serious issues of rape and racial inequality.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 3,
    author: 'J.K. Rowling',
    title: "Harry Potter and the Sorcerer's Stone",
    coverImage: 'https://example.com/images/harrypotter.jpg',
    numOfPages: 309,
    description: 'The first novel in the Harry Potter series.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 4,
    author: 'J.R.R. Tolkien',
    title: 'The Hobbit',
    coverImage: 'https://example.com/images/thehobbit.jpg',
    numOfPages: 310,
    description: "A fantasy novel and children's book by English author J.R.R. Tolkien.",
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 5,
    author: 'F. Scott Fitzgerald',
    title: 'The Great Gatsby',
    coverImage: null,
    numOfPages: 180,
    description: 'A novel set in the Jazz Age on Long Island.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 6,
    author: 'Herman Melville',
    title: 'Moby Dick',
    coverImage: null,
    numOfPages: 635,
    description: 'A novel about the voyage of the whaling ship Pequod.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 7,
    author: 'Jane Austen',
    title: 'Pride and Prejudice',
    coverImage: null,
    numOfPages: 432,
    description: 'A romantic novel of manners written by Jane Austen.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 8,
    author: 'Mark Twain',
    title: 'The Adventures of Huckleberry Finn',
    coverImage: null,
    numOfPages: 366,
    description: 'A novel about a young boy named Huck and his adventures.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 9,
    author: 'Leo Tolstoy',
    title: 'War and Peace',
    coverImage: null,
    numOfPages: 1225,
    description: 'A novel that chronicles the history of the French invasion of Russia.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
  {
    id: 10,
    author: 'Mary Shelley',
    title: 'Frankenstein',
    coverImage: null,
    numOfPages: 280,
    description: 'A novel about a young scientist who creates a grotesque creature.',
    createdAt: '2024-05-16T00:00:00Z',
    updatedAt: '2024-05-16T00:00:00Z',
  },
];

const categories = [
  {
    id: 1,
    type: 'Dystopian',
    bookIds: [1],
  },
  {
    id: 2,
    type: 'Classic',
    bookIds: [2, 5, 7],
  },
  {
    id: 3,
    type: 'Fantasy',
    bookIds: [3, 4],
  },
  {
    id: 4,
    type: 'Adventure',
    bookIds: [6, 8],
  },
  {
    id: 5,
    type: 'Historical',
    bookIds: [9],
  },
  {
    id: 6,
    type: 'Horror',
    bookIds: [10],
  },
];

async function seedDb() {
  console.log('Running seeds...');

  await db.transaction(async (tx) => {
    await tx.insert(schema.books).values(
      books.map((book) => ({
        author: book.author,
        title: book.title,
        coverImage: book.coverImage,
        description: book.description,
        numOfPages: book.numOfPages,
        id: book.id,
      })),
    );

    await tx.insert(schema.categories).values(categories);

    categories.map(async (category) => {
      const bookIds = category.bookIds;
      return bookIds.map(async (bookId) => {
        return await tx.insert(schema.categories_to_books).values({
          bookId,
          categoryId: category.id,
        });
      });
    });
  });
}

seedDb()
  .then((x) => {
    console.log('database seed complete.');
    return;
  })
  .catch(() => {
    console.log('error to seed database.');
  });

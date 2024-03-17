import * as schema from "./schema";
import { db } from "./client";

const books = [
  {
    author: "J.R.R. Tolkien",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    num_of_pages: 544,
    description:
      "An epic high fantasy adventure about a hobbit who inherits a powerful ring and embarks on a quest to destroy it.",
  },
  {
    author: "George R.R. Martin",
    title: "A Game of Thrones",
    num_of_pages: 694,
    description:
      "The first book in the A Song of Ice and Fire series, following several noble families in a civil war for control of the Iron Throne.",
  },
  {
    author: "Harper Lee",
    title: "To Kill a Mockingbird",
    num_of_pages: 324,
    description:
      "A coming-of-age story set in the Deep South during the 1930s, narrated by a young girl named Scout Finch.",
  },
  {
    author: "Margaret Atwood",
    title: "The Handmaid's Tale",
    num_of_pages: 348,
    description:
      "A dystopian novel set in a future America where women are forced into servitude as childbearers.",
  },
  {
    author: "Gabriel García Márquez",
    title: "One Hundred Years of Solitude",
    num_of_pages: 472,
    description:
      "A magical realist novel that chronicles the rise and fall of the Buendía family and the fictional town of Macondo.",
  },
  {
    author: "Leo Tolstoy",
    title: "War and Peace",
    num_of_pages: 1225,
    description:
      "A historical novel that follows five aristocratic families in Russia during the Napoleonic Wars.",
  },
  {
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    num_of_pages: 180,
    description:
      "A novel about the wealthy lifestyle and moral decay of the Jazz Age in America.",
  },
  {
    author: "Jane Austen",
    title: "Pride and Prejudice",
    num_of_pages: 224,
    description:
      "A classic novel of manners and romance set in England during the Regency era.",
  },
  {
    author: "Victor Hugo",
    title: "Les Misérables",
    num_of_pages: 1534,
    description:
      "An epic historical novel set in early 19th-century France, following the struggles of Jean Valjean, a former convict.",
  },
  {
    author: "Charles Dickens",
    title: "A Tale of Two Cities",
    num_of_pages: 256,
    description:
      "A historical novel set in London and Paris before and during the French Revolution.",
  },
];

async function seedDb() {
  console.log("Running seeds...");
  const booksInserts = books.map(async (book) => {
    return db.insert(schema.books).values({
      author: book.author,
      title: book.title,
      numOfPages: book.num_of_pages,
      description: book.description,
    });
  });

  return Promise.all(booksInserts);
}

seedDb()
  .then(() => console.log("Registros criados com sucesso!"))
  .catch(() => "Erro ao popular database!");

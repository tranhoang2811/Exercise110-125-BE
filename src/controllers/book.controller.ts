import { Request, Response } from "express";
import { IBook } from "../interface/book";
import { getValidArray, readFile, writeFile } from "../utils/common";

export async function list(
  request: Request,
  response: Response
): Promise<Response<IBook[]>> {
  const jsonBooks: string = await readFile("./src/constants.json");
  const books: IBook[] = getValidArray(JSON.parse(jsonBooks));
  return response.status(200).json(books);
}

export async function detail(
  request: Request,
  response: Response
): Promise<Response<IBook | string>> {
  const { id } = request.params;
  const jsonBooks: string = await readFile("./src/constants.json");
  const books: IBook[] = getValidArray(JSON.parse(jsonBooks));
  const selectedBook: IBook | undefined = getValidArray(books).find(
    (book: IBook) => book?.BookId === id
  );
  if (!selectedBook) {
    return response.status(404).end("Book not found");
  }
  return response.status(200).json(selectedBook);
}

export async function create(
  request: Request,
  response: Response
): Promise<Response<IBook>> {
  const newBook: IBook = request.body;
  const jsonBooks: string = await readFile("./src/constants.json");
  const books: IBook[] = getValidArray(JSON.parse(jsonBooks));
  const selectedBook: IBook | undefined = getValidArray(books).find(
    (book: IBook) => book?.BookId === newBook?.BookId
  );
  if (selectedBook) {
    return response.status(409).end("BookId already exists");
  }
  books.push(newBook);
  await writeFile("./src/constants.json", JSON.stringify(books));
  return response.status(200).json(newBook);
}

export async function replace(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params;
  const newBook: IBook = request.body;
  const jsonBooks: string = await readFile("./src/constants.json");
  const books: IBook[] = getValidArray(JSON.parse(jsonBooks));
  const bookIndex: number = books.findIndex(
    (book: IBook) => book?.BookId === id
  );
  if (bookIndex === -1) {
    response.status(404).end("Book not found");
  }
  books[bookIndex] = { ...newBook, BookId: id };
  await writeFile("./src/constants.json", JSON.stringify(books));
  response.status(204).end();
}

export async function remove(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params;
  const jsonBooks: string = await readFile("./src/constants.json");
  const books: IBook[] = getValidArray(JSON.parse(jsonBooks));
  const newBooks: IBook[] = books.filter((book: IBook) => book?.BookId !== id);
  if (books?.length === newBooks?.length) {
    response.status(404).end("Book not found");
  }
  await writeFile("./src/constants.json", JSON.stringify(newBooks));
  response.status(204).end();
}

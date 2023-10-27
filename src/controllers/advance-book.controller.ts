import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import dayjs from "dayjs";
import { IAdvanceBook } from "../interface/advance-book";
import { getValidArray, readFile, writeFile } from "../utils/common";

// *INFO: These api are for exercise 125

export async function list(
  request: Request,
  response: Response
): Promise<Response<IAdvanceBook[]>> {
  const jsonBooks: string = await readFile("./src/advance-books.json");
  const books: IAdvanceBook[] = getValidArray(JSON.parse(jsonBooks));
  return response.status(200).json(books);
}

export async function detail(
  request: Request,
  response: Response
): Promise<Response<IAdvanceBook | string>> {
  const { id } = request.params;
  const parsedId: number = parseInt(id);
  const jsonBooks: string = await readFile("./src/advance-books.json");
  const books: IAdvanceBook[] = getValidArray(JSON.parse(jsonBooks));
  const selectedBook: IAdvanceBook | undefined = getValidArray(books).find(
    (book: IAdvanceBook) => book?.id === parsedId
  );
  if (!selectedBook) {
    return response.status(404).end("Book not found");
  }
  return response.status(200).json(selectedBook);
}

export async function create(
  request: Request,
  response: Response
): Promise<Response<IAdvanceBook>> {
  const updatedAt = dayjs().format('YYYY-MM-DD HH:mm').toString();
  const newBook: IAdvanceBook = {
    ...request.body,
    updatedAt,
  };
  const jsonBooks: string = await readFile("./src/advance-books.json");
  const books: IAdvanceBook[] = getValidArray(JSON.parse(jsonBooks));
  const selectedBook: IAdvanceBook | undefined = getValidArray(books).find(
    (book: IAdvanceBook) => book?.id === newBook?.id
  );
  if (selectedBook) {
    return response.status(409).end("Book already exists");
  }
  books.push(newBook);
  await writeFile("./src/advance-books.json", JSON.stringify(books));
  return response.status(200).json(newBook);
}

export async function replace(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params;
  const parsedId: number = parseInt(id);
  const updatedAt = dayjs().format('YYYY-MM-DD HH:mm').toString();
  const newBook: IAdvanceBook = {
    ...request.body,
    updatedAt,
  };
  const jsonBooks: string = await readFile("./src/advance-books.json");
  const books: IAdvanceBook[] = getValidArray(JSON.parse(jsonBooks));
  const bookIndex: number = books.findIndex(
    (book: IAdvanceBook) => book?.id === parsedId
  );
  if (bookIndex === -1) {
    response.status(404).end("Book not found");
  }
  books[bookIndex] = { ...books[bookIndex], ...newBook, id: parsedId };
  await writeFile("./src/advance-books.json", JSON.stringify(books));
  response.status(204).end();
}

export async function remove(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params;
  const parsedId: number = parseInt(id);
  const jsonBooks: string = await readFile("./src/advance-books.json");
  const books: IAdvanceBook[] = getValidArray(JSON.parse(jsonBooks));
  const newBooks: IAdvanceBook[] = books.filter(
    (book: IAdvanceBook) => book?.id !== parsedId
  );
  if (books?.length === newBooks?.length) {
    response.status(404).end("Book not found");
  }
  await writeFile("./src/advance-books.json", JSON.stringify(newBooks));
  response.status(204).end();
}

export function uploadCoverImage(
  request: Request,
  response: Response
): Response {
  const image: UploadedFile = request.files?.image as UploadedFile;
  if (!image) {
    return response.status(400).end();
  }
  const filePath: string = path.join(
    __dirname,
    `../../uploads/cover-images/${image.name}`
  );
  image.mv(filePath);
  return response.status(200).end(JSON.stringify(image.name));
}

export function getCoverImage(request: Request, response: Response): void {
  const { fileName } = request.params;
  const filePath: string = path.join(
    __dirname,
    `../../uploads/cover-images/${fileName}`
  );
  response.sendFile(filePath);
}

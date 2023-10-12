import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { getValidArray } from "../utils/common";

export function uploadSingleFile(
  request: Request,
  response: Response
): Response {
  const image: UploadedFile = request.files?.image as UploadedFile;
  if (!image) {
    return response.status(400).end();
  }
  const filePath: string = path.join(__dirname, `../../uploads/${image.name}`);
  image.mv(filePath);
  return response.status(200).end();
}

export function uploadMultipleFiles(
  request: Request,
  response: Response
): Response {
  const images: UploadedFile[] = request.files?.images as UploadedFile[];
  getValidArray(images).forEach((image: UploadedFile) => {
    if (!image) {
      return response.status(400).end();
    }
    const filePath: string = path.join(
      __dirname,
      `../../uploads/${image.name}`
    );
    image.mv(filePath);
  });
  return response.status(200).end();
}

export function getImage(request: Request, response: Response): void {
  const { fileName } = request.params;
  const filePath: string = path.join(__dirname, `../../uploads/${fileName}`);
  response.sendFile(filePath);
}

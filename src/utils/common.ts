import fs from "fs";

export function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

export function writeFile(path: string, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

export function checkValidArray<T>(array?: T[]): boolean {
  return array ? Array.isArray(array) && array.length > 0 : false;
}

export function getValidArray<T>(array?: T[]): T[] {
  return checkValidArray(array) ? array ?? [] : [];
}

import express, { Request, Response, NextFunction } from 'express';
import { getBooksDB, postBookDB, softDeleteDB, getBooksInLibraryDB } from '../repository/book.repository';
import { findBookInstanceByNamePublisherAndAuthor, getInstancByName, postBookInstanceDB } from '../repository/bookinstance.repository';

export const getBooks = async () =>  await getBooksDB()

export const getBooksInLibrary = async () => { return await getBooksInLibraryDB();};

export const postBooks = async (books: any) => {
        const info = await getInstancByName(books.bookCode);
        let newBooks: object[] = [];
        while (books.amount) {
                books.amount -= 1;
                const book = await postBookDB(books.bookCode);
                newBooks.push(book);
        }
        const newBookReport = {
                books: newBooks,
                info: info,
        };
        return newBookReport;
};

export const postNewBooks = async (books: any) => {
        const existingBookInstance = await findBookInstanceByNamePublisherAndAuthor(books.name, books.author, books.publisher);
        const bookInstance = existingBookInstance || await postBookInstanceDB(books);
      
        let newBooks: object[] = [];
        while (books.amount) {  //5
          books.amount -= 1;
          const book = await postBookDB(bookInstance.bookCode);
          newBooks.push(book);
        }
        const newBookReport = {
          books: newBooks,
          info: bookInstance,
        };
        return newBookReport;
      };
      
      export const softDelete = async (id: number) => {  return await softDeleteDB(id);};
      
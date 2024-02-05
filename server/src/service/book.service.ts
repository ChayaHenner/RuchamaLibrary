import express, { Request, Response, NextFunction } from 'express';
import { getBooksDB, postBookDB, softDeleteDB, getBooksInLibraryDB } from '../repository/book.repository';
import { findBookInstanceByNamePublisherAndAuthor, getInstancByName, postBookInstanceDB } from '../repository/bookinstance.repository';

export async function getBooks() {
 
        const publishers = await getBooksDB();

        return publishers;
   
}
export async function getBooksInLibrary() {
 
        const publishers = await getBooksInLibraryDB();

        return publishers;
 
}
export async function postBooks(books: any) {
    
        //add json with book instance info 

        //get bookinstance by book_code attribute
        const book_info = await getInstancByName(books.book_code)
        let newBooks: object[] = []
        while (books.amount) {
            books.amount -= 1
            const book = await postBookDB(books.book_code);
            newBooks.push(book)

        }
        const newBookReport = {
            books: newBooks,
            book_info: book_info
        }
        return newBookReport;
   
}
export async function postNewBooks(books: any) {
    
        console.log(books);

        const existingBookInstance = await findBookInstanceByNamePublisherAndAuthor(books.book_name, books.author, books.publisher_id)
        const bookInstance = existingBookInstance || await postBookInstanceDB(books);

        let newBooks: object[] = []
        while (books.amount) {
            books.amount -= 1
            const book = await postBookDB(bookInstance.book_code);
            newBooks.push(book)

        }
        const newBookReport = {
            books: newBooks,
            book_info: bookInstance
        }

        return newBookReport;
    
}
export async function softDelete(id: number) {
 
        const publisher = await softDeleteDB(id);
        return publisher;
    
}

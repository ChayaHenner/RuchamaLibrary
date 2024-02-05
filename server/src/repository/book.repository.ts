import { Book } from '../entities/Book'
import { libraryData } from '../app';
import { FindManyOptions } from 'typeorm';

 
export const getBooksDB = async () => {
  const readers = await Book.find();
  return readers;
};

export const getBooksInLibraryDB = async () => {
  const options: FindManyOptions<Book> = {
    where: { book_taken: false },
  };

  const books = await Book.find(options);
  return books;
};

export const postBookDB = async (book_code: any) => {
  const newBook = Book.create({
    book_code,
  });

  await newBook.save();
  return newBook;
};

export const softDeleteDB = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { book_id: id },
  });

  await book.softRemove();

  return book;
};

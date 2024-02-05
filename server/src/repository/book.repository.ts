import { Book } from '../entities/Book'
import { libraryData } from '../app';
import { FindManyOptions } from 'typeorm';

 
export const getBooksDB = async () => {return await Book.find()};

export const getBooksInLibraryDB = async () => {
  const options: FindManyOptions<Book> = {
    where: { book_taken: false },
  };

  return await Book.find(options);
};

export const postBookDB = async (book_code: any) => {
  return Book.save({
    book_code
  });

};

export const softDeleteDB = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { book_id: id },
  });

  return book.softRemove();
};

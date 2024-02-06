import { Book } from '../entities/Book'
import { libraryData } from '../app';
import { FindManyOptions } from 'typeorm';


export const getBooksDB =  () =>   Book.find() 

export const getBooksInLibraryDB = () => Book.find({ where: { book_taken: false } })

export const postBookDB = async (book_code: any) => {
  return Book.save({
    book_code//:{book_code}
  });

};//!

export const softDeleteDB = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { id: id },
  });

  return book.softRemove();
};

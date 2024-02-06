import { Book } from '../entities/Book'
import { libraryData } from '../app';
import { FindManyOptions } from 'typeorm';


export const getBooksDB =  () =>   Book.find() 

export const getBooksInLibraryDB = () => Book.find({ where: { book_taken: false } })

export const postBookDB = async (bookCode: any) => {
  return Book.save({
    bookCode//:{bookCode}
  });

};//!

export const softDeleteDB = async (id: number) => {
  const book = await Book.findOneOrFail({
    where: { id: id },
  });

  return book.softRemove();
};

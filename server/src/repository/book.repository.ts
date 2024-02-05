import { Book } from '../models/Book'
import { libraryData } from '../app';
import { FindManyOptions } from 'typeorm';

 
export async function  getBooksDB(){
   
    try {
        const readers = await Book.find();
        return readers;

      } catch (error) {
        throw error;
      }
}

export async function getBooksInLibraryDB() {
  try {
    const options: FindManyOptions<Book> = {
      where: { book_taken: false },
    };

    const books = await Book.find(options);
    return books;
  } catch (error) {
    throw error;
  }
}


export async function  postBookDB(book_code:any){
    // try {
        const newBook = Book.create({
            book_code,
          });
    
          await newBook.save();   
        return newBook;

      // } catch (error) {
      //   throw error;
      // }
}
export async function  softDeleteDB(id:number){
    try {
        const book = await Book.findOneOrFail({
            where: { book_id: id },
          });
      
          await book.softRemove();
          
        return book;
      } catch (error) {
        throw error;
      }
}

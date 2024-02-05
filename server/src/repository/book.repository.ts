import { Book } from '../entities/Book'
import { libraryData } from '../app';
import { FindManyOptions } from 'typeorm';

 
export async function  getBooksDB(){
   
        const readers = await Book.find();
        return readers;

}

export async function getBooksInLibraryDB() {
 
    const options: FindManyOptions<Book> = {
      where: { book_taken: false },
    };

    const books = await Book.find(options);
    return books;
 
}


export async function  postBookDB(book_code:any){
   
        const newBook = Book.create({
            book_code,
          });
    
          await newBook.save();   
        return newBook;

}
export async function  softDeleteDB(id:number){
   
        const book = await Book.findOneOrFail({
            where: { book_id: id },
          });
      
          await book.softRemove();
          
        return book;
     
}

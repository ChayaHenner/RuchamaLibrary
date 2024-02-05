import { Borrowing } from '../entities/Borrowing'
import { Book } from '../entities/Book'
import { BookInstance } from '../entities/BookInstance'
import { Reader } from '../entities/Reader'
import { createQueryBuilder, getConnection } from 'typeorm';
import { libraryData } from '../app';

export async function getTopTenBooks() {
 
        const topTenBooks = await libraryData.getRepository(Borrowing)
            .createQueryBuilder('borrowing')
            .leftJoinAndSelect('borrowing.book_id', 'book')
            .leftJoinAndSelect('book.book_code', 'bookinstance')
            .select(['book.book_code', 'bookinstance.book_name AS name', 'COUNT(borrowing.id) AS borrowCount'])
            .groupBy('book.book_code ,bookinstance.book_name')
            .orderBy('borrowCount', 'DESC')
            .limit(10)
            .getRawMany();

        console.log(topTenBooks);

        return topTenBooks;
  
}

export async function getBorrowingByReaderDB(reader_id: number) {
    
        const result = await libraryData
            .getRepository(Borrowing)
            .createQueryBuilder('borrowing')
            .leftJoinAndSelect('borrowing.book_id', 'book')
            .leftJoinAndSelect('borrowing.reader_id', 'reader')
            .leftJoinAndSelect('book.book_code', 'bookinstance')
            .andWhere('reader.reader_id = :readerId', { readerId: reader_id })
            .select([
                'reader.reader_id',
                'reader.name',
                'reader.email',
                `JSON_AGG(CASE WHEN borrowing.date_returned IS NULL THEN jsonb_build_object('book_id', book.book_id, 'book_instance', to_jsonb(bookinstance), 'date_borrowed', borrowing.date_borrowed, 'borrowing_id', borrowing.id) END) FILTER(WHERE borrowing.date_returned IS NULL) AS toreturn`,
                `JSON_AGG(CASE WHEN borrowing.date_returned IS NOT NULL THEN jsonb_build_object('book_id', book.book_id, 'book_instance', to_jsonb(bookinstance), 'date_borrowed', borrowing.date_borrowed, 'borrowing_id', borrowing.id, 'date_returned', borrowing.date_returned) END) FILTER(WHERE borrowing IS NOT NULL) AS history`,
            ])
            .groupBy('reader.reader_id,reader.name,reader.email ')
            .getRawOne();

        console.log(result);
        if (!result) {
            console.log('No borrowings found. Fetching reader info.');

            const readerInfo = await libraryData
                .getRepository(Reader)
                .createQueryBuilder('reader')
                .select(['reader.reader_id', 'reader.name', 'reader.email'])
                .where('reader.reader_id = :readerId', { readerId: reader_id })
                .getRawOne();

            console.log('Reader info:', readerInfo);

            return readerInfo;
        }
        return result;
  
}

export async function getBorrowingDB() {
        const borrowing = await Borrowing.find();
        return borrowing;
}
export async function findBookDB(book_id: number) {

        const book = await Book.findOne({ where: { book_id } });
        return book;

}
export async function findReaderDB(reader_id: number) {

 
        const reader = await Reader.findOne({ where: { reader_id } });
        return reader;

}
export async function findBorrowDB(id: number) {

   
        const borrow = await Borrowing.findOne({ where: { id } });
        return borrow;

}
export async function createBorrowingDB(borrowing: any) {
  
        const newBorrowing = Borrowing.create({
            reader_id: borrowing.reader_id,
            book_id: borrowing.book_id,
        });

        await newBorrowing.save();
        return newBorrowing;

  
}


export async function returnBorrowingDB(id: number) {
    
        let borrowing = await Borrowing.findOne({ where: { id } });
        if (borrowing && borrowing.date_returned == null) {
            borrowing.date_returned = new Date()
            await Borrowing.save(borrowing);
            return borrowing;

        }
        else throw "borrowing id incorrect or returned already"
   
}

export async function updateBookTaken(book_id: any) {
    
        let book = await Book.findOne({ where: { book_id } });
        console.log(book);

        if (book) {
            book!.book_taken = true
            console.log("changed to true");

            await Book.save(book);
            return book
        }

    
}
export async function updateBookNotTaken(book_id: any) {
   
        let book = await Book.findOne({ where: { book_id } });
        console.log(book);

        if (book) {
            book!.book_taken = false
            console.log("changed to false");

            await Book.save(book);
            return book
        }

   
}

export async function checkBookTaken(book_id: any) {
   
        let book = await Book.findOne({ where: { book_id } });
        console.log(book);

        if (book) {
            if (book!.book_taken === false)
                return false
            else return true
        }
        else return false

}

export async function getTwoWeeksPassedDB() {
    
        const TwoWeeksPassed = await libraryData.getRepository(Borrowing)
        .createQueryBuilder('borrowing')
        .leftJoinAndSelect('borrowing.book_id', 'book')
        .leftJoinAndSelect('borrowing.reader_id', 'reader')
        .leftJoinAndSelect('book.book_code', 'bookinstance')
        // .andWhere('borrowing.date_borrowed < NOW() - INTERVAL \'2 weeks\'')
        .andWhere('borrowing.date_returned IS NULL')
        .select([
          'reader.reader_id',
          'reader.name',
          'reader.email',
          'JSON_AGG(CASE WHEN borrowing.date_returned IS NULL THEN jsonb_build_object(\'book_id\', book.book_id, \'book_instance\', to_jsonb(bookinstance), \'date_borrowed\', borrowing.date_borrowed ,\'borrowing_id\', borrowing.id) END) AS unreturned_books',
        ])
        .groupBy('reader.reader_id,reader.name,reader.email ')
        .getRawMany();
  
      console.log(TwoWeeksPassed);
  
      return TwoWeeksPassed;
  
}


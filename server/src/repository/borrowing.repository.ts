import { Borrowing } from '../entities/Borrowing'
import { Book } from '../entities/Book'
import { Reader } from '../entities/Reader'
import { libraryData } from '../app';

export const getTopTenBooks = async () => {
        return await libraryData
                .getRepository(Borrowing)
                .createQueryBuilder('borrowing')
                .leftJoinAndSelect('borrowing.book_id', 'book')
                .leftJoinAndSelect('book.book_code', 'bookinstance')
                .select(['book.book_code', 'bookinstance.book_name AS name', 'COUNT(borrowing.id) AS borrowCount'])
                .groupBy('book.book_code ,bookinstance.book_name')
                .orderBy('borrowCount', 'DESC')
                .limit(10)
                .getRawMany();
};


export const getBorrowingByReaderDB = async (reader_id: number) => {

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

export const getBorrowingDB = async () => { return await Borrowing.find(); }

export const findBookDB = async (book_id: number) => { return await Book.findOne({ where: { book_id } })};

export const findReaderDB = async (reader_id: number) => {  return await Reader.findOne({ where: { reader_id } });};

export const findBorrowDB = async (id: number) => {  return await Borrowing.findOne({ where: { id } });};

export const createBorrowingDB = async (borrowing: any) => {
        return Borrowing.save({
                reader_id: borrowing.reader_id,
                book_id: borrowing.book_id,
        });
};

export const returnBorrowingDB = async (id: number) => {

        let borrowing = await Borrowing.findOne({ where: { id } });
        if (borrowing && borrowing.date_returned == null) {
                borrowing.date_returned = new Date();
                await Borrowing.save(borrowing);
                return borrowing;
        } else throw "borrowing id incorrect or returned already";
};

export const updateBookTaken = async (book_id: number) => {
        let book = await Book.findOne({ where: { book_id } });

        if (book) {
                book!.book_taken = true;
                await Book.save(book);
                return book;
        }
};

export const updateBookNotTaken = async (book_id: number) => {
        let book = await Book.findOne({ where: { book_id } });
        console.log(book);

        if (book) {
                book!.book_taken = false;
                console.log("changed to false");

                await Book.save(book);
                return book;
        }
};

export const checkBookTaken = async (book_id: number) => {
        let book = await Book.findOne({ where: { book_id } });
        if (book) {
                return book!.book_taken
        } else return false;
};

export const getTwoWeeksPassedDB = async () => {
        const TwoWeeksPassed = await libraryData
                .getRepository(Borrowing)
                .createQueryBuilder('borrowing')
                .leftJoinAndSelect('borrowing.book_id', 'book')
                .leftJoinAndSelect('borrowing.reader_id', 'reader')
                .leftJoinAndSelect('book.book_code', 'bookinstance')
                .andWhere('borrowing.date_returned IS NULL')
                .select([
                        'reader.reader_id',
                        'reader.name',
                        'reader.email',
                        'JSON_AGG(CASE WHEN borrowing.date_returned IS NULL THEN jsonb_build_object(\'book_id\', book.book_id, \'book_instance\', to_jsonb(bookinstance), \'date_borrowed\', borrowing.date_borrowed ,\'borrowing_id\', borrowing.id) END) AS unreturned_books',
                ])
                .groupBy('reader.reader_id,reader.name,reader.email ')
                .getRawMany();
        return TwoWeeksPassed;
};

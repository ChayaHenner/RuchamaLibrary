import { Borrowing } from '../entities/Borrowing'
import { Book } from '../entities/Book'
import { Reader } from '../entities/Reader'
import { libraryData } from '../app';

export const getTopTenBooks = async () => {
        return await libraryData
                .getRepository(Borrowing)
                .createQueryBuilder('borrowing')
                .leftJoinAndSelect('borrowing.book', 'book')
                .leftJoinAndSelect('book.book_code', 'bookinstance')
                .select(['book.book_code', 'bookinstance.book_name AS name', 'CAST(COUNT(borrowing.id) AS INT) AS borrowCount'])
                .groupBy('book.book_code ,bookinstance.book_name')
                .orderBy('borrowCount', 'DESC')
                .limit(10)
                .getRawMany();
};


export const getBorrowingByReaderDB = async (reader_id: number) => {

        const result = await libraryData
                .getRepository(Borrowing)
                .createQueryBuilder('borrowing')
                .leftJoinAndSelect('borrowing.book', 'book')
                .leftJoinAndSelect('borrowing.reader_id', 'reader')
                .leftJoinAndSelect('book.book_code', 'bookinstance')
                .andWhere('reader.reader_id = :readerId', { readerId: reader_id })
                .select([
                        'reader.reader_id',
                        'reader.name',
                        'reader.email',
                        `JSON_AGG(CASE WHEN borrowing.date_returned IS NULL THEN jsonb_build_object('id', book.id, 'book_instance', to_jsonb(bookinstance), 'date_borrowed', borrowing.date_borrowed, 'borrowing_id', borrowing.id) END) FILTER(WHERE borrowing.date_returned IS NULL) AS toreturn`,
                        `JSON_AGG(CASE WHEN borrowing.date_returned IS NOT NULL THEN jsonb_build_object('id', book.id, 'book_instance', to_jsonb(bookinstance), 'date_borrowed', borrowing.date_borrowed, 'borrowing_id', borrowing.id, 'date_returned', borrowing.date_returned) END) FILTER(WHERE borrowing IS NOT NULL) AS history`,
                ])
                .groupBy('reader.reader_id,reader.name,reader.email ')
                .getRawOne();

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

export const findBookDB = async (id: number) => { return await Book.findOne({ where: { id } })};

export const findReaderDB = async (reader_id: number) => {  return await Reader.findOne({ where: { reader_id } });};

export const findBorrowDB = async (id: number) => {  return await Borrowing.findOne({ where: { id } });};

export const createBorrowingDB = async (borrowing: any) => {
        return Borrowing.save({
                reader_id: borrowing.reader_id,
                book: borrowing.book,
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

export const updateBookTaken = async (id: number) => {
        let book = await Book.findOne({ where: { id } });

        if (book) {
                book!.book_taken = true;
                await Book.save(book);
                return book;
        }
};

export const updateBookNotTaken = async (id: number) => {
        let book = await Book.findOne({ where: { id } });
        console.log(book);

        if (book) {
                book!.book_taken = false;
                console.log("changed to false");

                await Book.save(book);
                return book;
        }
};

export const checkBookTaken = async (id: number) => {
        let book = await Book.findOne({ where: { id } });
        if (book) {
                return book!.book_taken
        } else return false;
};

export const getTwoWeeksPassedDB = async () => {
        const TwoWeeksPassed = await libraryData
                .getRepository(Borrowing)
                .createQueryBuilder('borrowing')
                .leftJoinAndSelect('borrowing.book', 'book')
                .leftJoinAndSelect('borrowing.reader_id', 'reader')
                .leftJoinAndSelect('book.book_code', 'bookinstance')
                .where('borrowing.date_returned IS NULL')
                .andWhere('reader.reader_id IS NOT NULL') // readers that were deleted... problomatic
                .andWhere('borrowing.date_borrowed < NOW() - INTERVAL \'5 days\'')

                .select([
                        'reader.reader_id',
                        'reader.name',
                        'reader.email',
                        'JSON_AGG(CASE WHEN borrowing.date_returned IS NULL THEN jsonb_build_object(\'id\', book.id, \'book_instance\', to_jsonb(bookinstance), \'date_borrowed\', borrowing.date_borrowed ,\'borrowing_id\', borrowing.id) END) AS unreturned_books',
                ])
                .groupBy('reader.reader_id,reader.name,reader.email ')
                .getRawMany();
        return TwoWeeksPassed;
};

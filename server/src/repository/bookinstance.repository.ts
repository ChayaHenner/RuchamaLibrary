import { BookInstance } from '../entities/BookInstance'
import { Book } from '../entities/Book'
import { libraryData } from '../app';

export const getBookInstancesDB = async () => { return await BookInstance.find();};

export const getInstancByName = async (bookCode: number) => {
  const bookInstance = await BookInstance.findOne({ where: { book_code: bookCode } });
  if (!bookInstance) {
    throw new Error(`Book instance with book_code ${bookCode} not found`);
  }
  return bookInstance;
};


export const getBookInstancesLibraryDB=async() =>{
 //7
    const bookInstancesWithCounts = await libraryData.getRepository(Book)
    .createQueryBuilder('book')
    .select([
      'book.book_code',
      'bookinstance.name',
      'bookinstance.author',
      'bookinstance.publisher_id',
      'bookinstance.category',
      'JSON_AGG(JSON_BUILD_OBJECT(\'id\', book.id, \'book_taken\', book.book_taken)::jsonb) AS books',
      'CAST(COUNT(book.id) AS INTEGER) AS total_ids',
      'CAST(SUM(CASE WHEN book.book_taken = false THEN 1 ELSE 0 END) AS INTEGER) AS not_taken_count'
    ])
    .leftJoin('book.book_code', 'bookinstance')
    .groupBy('book.book_code ,bookinstance.name  ,bookinstance.author  ,bookinstance.publisher_id  ,bookinstance.category') // Adjust the grouping based on your needs
  .getRawMany();

    return bookInstancesWithCounts;

}

export const postBookInstanceDB = async (bookinstance: any) => {
  return BookInstance.save({
     ...bookinstance,

  });

};

//8
export const findBookInstanceByNamePublisherAndAuthor = async (  bookName: string, author: string, publisher_id: string): Promise<any | null> => {
  const bookInstance = await BookInstance.findOne({ where: { name: bookName, author } }); //,publisher_id??
  return bookInstance || null;
};
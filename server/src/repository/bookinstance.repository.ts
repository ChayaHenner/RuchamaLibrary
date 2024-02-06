import { BookInstance } from '../entities/BookInstance'
import { Book } from '../entities/Book'
import { libraryData } from '../app';

export const getBookInstancesDB = async () => { return await BookInstance.find();};

export const getInstancByName = async (bookCode: number) => {
  const bookInstance = await BookInstance.findOne({ where: { bookCode: bookCode } });
  if (!bookInstance) {
    throw new Error(`Book instance with bookCode ${bookCode} not found`);
  }
  return bookInstance;
};


export const getBookInstancesLibraryDB=async() =>{
 //7
    const bookInstancesWithCounts = await libraryData.getRepository(Book)
    .createQueryBuilder('book')
    .select([
      'book.bookCode',
      'bookinstance.name',
      'bookinstance.author',
      'bookinstance.category',
      'JSON_AGG(JSON_BUILD_OBJECT(\'id\', book.id, \'bookTaken\', book.bookTaken)::jsonb) AS books',
      'CAST(COUNT(book.id) AS INTEGER) AS total_ids',
      'CAST(SUM(CASE WHEN book.bookTaken = false THEN 1 ELSE 0 END) AS INTEGER) AS not_taken_count'
    ])
    .leftJoin('book.bookCode', 'bookinstance')
    .groupBy('book.bookCode ,bookinstance.name  ,bookinstance.author  ,bookinstance.category')
  .getRawMany();

    return bookInstancesWithCounts;

}

export const postBookInstanceDB = async (bookinstance: any) => {
  return BookInstance.save({
     ...bookinstance,

  });

};

//8
export const findBookInstanceByNamePublisherAndAuthor = async (  bookName: string, author: string, publisher: string): Promise<any | null> => {
  const bookInstance = await BookInstance.findOne({ where: { name: bookName, author } }); //,publisher??
  return bookInstance || null;
};
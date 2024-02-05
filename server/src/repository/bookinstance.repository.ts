import { BookInstance } from '../entities/BookInstance'
import { Book } from '../entities/Book'
import { libraryData } from '../app';


export async function getBookInstancesDB() {

  try {
    const readers = await BookInstance.find();
    return readers;

  } catch (error) {
    throw error;
  }
}
export async function getInstancByName(bookCode: number) {
  try {
    const bookInstance = await BookInstance.findOne({  where: { book_code: bookCode }});

    if (!bookInstance) {
      throw new Error(`Book instance with book_code ${bookCode} not found`);
    }

    return bookInstance;
  } catch (error) {
    throw error;
  }
}

export async function getBookInstancesLibraryDB() {
  try {
    // const bookInstancesWithCounts = await libraryData.getRepository(Book)
    //   .createQueryBuilder('book')
    //   .leftJoinAndSelect('book.book_code ',' bookinstance')
    //   .addSelect('COUNT(book.book_id) as total_books')
    //   .addSelect('SUM(CASE WHEN book.book_taken = true THEN 1 ELSE 0 END) as taken_books')
    //   .addSelect('SUM(CASE WHEN book.book_taken = false THEN 1 ELSE 0 END) as available_books')
    //   .groupBy('book_instance.book_code, book_instance.book_name, book_instance.author, book_instance.publisher_id, book_instance.price, book_instance.category')
    //   .getRawMany();
    // const bookInstancesWithCounts = await libraryData.getRepository(BookInstance)
    // .createQueryBuilder('bookinstance')
    // .leftJoinAndSelect(Book, 'book', 'bookinstance.book_code = book.book_code')
    // // .addSelect('COUNT(book.book_id) as total_books')
    // // .addSelect('SUM(CASE WHEN book.taken = true THEN 1 ELSE 0 END) as taken_books')
    // // .addSelect('SUM(CASE WHEN book.taken = false THEN 1 ELSE 0 END) as available_books')
    // // .groupBy('bookinstance.book_code')
    // .getRawMany();
    const bookInstancesWithCounts = await libraryData.getRepository(Book)
    .createQueryBuilder('book')
    .select([
      'book.book_code',
      'bookinstance.book_name',
      'bookinstance.author',
      'bookinstance.publisher_id',
      'bookinstance.category',
      'JSON_AGG(JSON_BUILD_OBJECT(\'book_id\', book.book_id, \'book_taken\', book.book_taken)::jsonb) AS books',
      'CAST(COUNT(book.book_id) AS INTEGER) AS total_book_ids',
      'CAST(SUM(CASE WHEN book.book_taken = false THEN 1 ELSE 0 END) AS INTEGER) AS not_taken_count'
    ])
    .leftJoin('book.book_code', 'bookinstance')
    .groupBy('book.book_code ,bookinstance.book_name  ,bookinstance.author  ,bookinstance.publisher_id  ,bookinstance.category') // Adjust the grouping based on your needs
  .getRawMany();


    return bookInstancesWithCounts;
  } catch (error) {
    throw error;
  }
}

export async function postBookInstanceDB(bookinstance: any) {
  try {
    const newBookInstance = BookInstance.create({
      book_name: bookinstance.book_name,
      author: bookinstance.author,
      publisher_id: bookinstance.publisher_id,
      price: bookinstance.price,
      category: bookinstance.category,

    });

    await newBookInstance.save();
    return newBookInstance;

  } catch (error) {
    throw error;
  }
}

export async function findBookInstanceByNamePublisherAndAuthor(bookName: string, author: string ,publisher_id :string): Promise<any | null> {

  try {
    const bookInstance = await BookInstance.findOne({ where: { book_name: bookName, author  } }); //,publisher_id??
    return bookInstance || null;
  }
  catch (error) {
    throw error;
  }
}
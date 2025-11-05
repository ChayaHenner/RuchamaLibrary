import 'reflect-metadata'
import { libraryData } from '../app'
import { Book } from '../entities/Book'
import { BookInstance } from '../entities/BookInstance'
import { Publisher } from '../entities/Publisher'
import { LevelCategory } from '../enum/bookInstance.enum'
import { Reader } from '../entities/Reader'
import { Borrowing } from '../entities/Borrowing'

async function seed() {
  await libraryData.initialize()
  console.log('Database connected for seeding!')

  await libraryData.getRepository(Borrowing).delete({})
  await libraryData.getRepository(Book).delete({})
  await libraryData.getRepository(BookInstance).delete({})
  await libraryData.getRepository(Publisher).delete({})
  await libraryData.getRepository(Publisher).delete({})
  await libraryData.getRepository(Reader).delete({})

  const publishers: Publisher[] = [
    { name: 'Penguin Random House', country: 'USA' },
    { name: 'HarperCollins', country: 'USA' },
    { name: 'Simon & Schuster', country: 'USA' },
    { name: 'Macmillan Publishers', country: 'UK' },
    { name: 'Hachette Livre', country: 'France' },
  ].map((data) => libraryData.getRepository(Publisher).create(data))

  await libraryData.getRepository(Publisher).save(publishers)

  const bookInstances: BookInstance[] = [
    {
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publisher: publishers[0],
      price: 25,
      category: LevelCategory.Adults,
    },
    {
      name: '1984',
      author: 'George Orwell',
      publisher: publishers[1],
      price: 20,
      category: LevelCategory.Academic,
    },
    {
      name: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publisher: publishers[2],
      price: 30,
      category: LevelCategory.Children,
    },
    {
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      publisher: publishers[3],
      price: 22,
      category: LevelCategory.Teens,
    },
    {
      name: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publisher: publishers[0],
      price: 18,
      category: LevelCategory.Adults,
    },
    {
      name: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      publisher: publishers[1],
      price: 35,
      category: LevelCategory.Teens,
    },
    {
      name: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publisher: publishers[2],
      price: 15,
      category: LevelCategory.Adults,
    },
    {
      name: "Charlotte's Web",
      author: 'E.B. White',
      publisher: publishers[3],
      price: 12,
      category: LevelCategory.Children,
    },
    {
      name: 'Moby Dick',
      author: 'Herman Melville',
      publisher: publishers[4],
      price: 28,
      category: LevelCategory.Adults,
    },
    {
      name: 'Little Women',
      author: 'Louisa May Alcott',
      publisher: publishers[0],
      price: 20,
      category: LevelCategory.Teens,
    },
  ].map((data) => libraryData.getRepository(BookInstance).create(data))

  await libraryData.getRepository(BookInstance).save(bookInstances)

  const books = bookInstances.map((instance) =>
    libraryData.getRepository(Book).create({ bookCode: instance }),
  )

  await libraryData.getRepository(Book).save(books)

  const readers: Reader[] = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      dob: new Date('2000-05-12'),
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      dob: new Date('1995-09-20'),
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      dob: new Date('2010-03-15'),
    },
    {
      name: 'Diana Prince',
      email: 'diana@example.com',
      dob: new Date('1988-11-01'),
    },
    {
      name: 'Ethan Hunt',
      email: 'ethan@example.com',
      dob: new Date('1992-07-23'),
    },
    {
      name: 'Fiona Gallagher',
      email: 'fiona@example.com',
      dob: new Date('2005-02-12'),
    },
    {
      name: 'George Martin',
      email: 'george@example.com',
      dob: new Date('1978-04-10'),
    },
    {
      name: 'Hannah Montana',
      email: 'hannah@example.com',
      dob: new Date('2003-08-14'),
    },
    {
      name: 'Ian Malcolm',
      email: 'ian@example.com',
      dob: new Date('1990-12-25'),
    },
    {
      name: 'Julia Roberts',
      email: 'julia@example.com',
      dob: new Date('1985-03-03'),
    },
  ].map((data) => libraryData.getRepository(Reader).create(data))

  await libraryData.getRepository(Reader).save(readers)

  console.log('Seeding completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding error:', err)
  process.exit(1)
})

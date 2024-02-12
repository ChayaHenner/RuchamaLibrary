import { libraryData } from '../app'
import { Book } from '../entities/Book'
import { Publisher } from '../entities/Publisher'

export const findPublishers = () =>
  libraryData
    .getRepository(Publisher)
    .createQueryBuilder('publisher')
    .select(['publisher.id', 'publisher.name'])
    .getMany()

export const findPublisherReport = async () => {
  try {
    const publisherReport = await libraryData
      .getRepository(Book)
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.bookCode', 'bookInstance')
      .leftJoinAndSelect('bookInstance.publisher', 'publisher')
      .select(['publisher.id as id', 'publisher.name as name',
      'CAST(COUNT(book.id) AS INTEGER) as bookCount', // Count of all books for each publisher as integer
      'CAST(SUM(bookInstance.price) AS INTEGER) as publisherPrice', // Sum of prices of all book instances for each publisher as integer

])
      .groupBy('publisher.id')
      .getRawMany()

    return publisherReport
  } catch (error) {
    throw new Error('Error while fetching publisher report: ' + error)
  }
}

export const savePublisher = (publisher: Publisher) =>
  Publisher.save({ ...publisher })

export const softRemove = async (id: number) => {
  const publisher = await Publisher.findOneOrFail({
    where: { id },
  })

  return await publisher.softRemove()
}

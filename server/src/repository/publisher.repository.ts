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
      .leftJoin('book.bookCode', 'bookInstance')
      .leftJoin('bookInstance.publisher', 'publisher')
      .select([
        'publisher.id as id',
        'publisher.name as name',
        'publisher.country as country',
        'CAST(COUNT(book.id) AS INTEGER) as bookCount', // Count of all books for each publisher as integer
        'CAST(SUM(bookInstance.price) AS INTEGER) as publisherPrice', // Sum of prices of all book instances for each publisher as integer
      ])
      .groupBy('publisher.id')
      .getRawMany()
      const allPublishers = await Publisher.find();

      allPublishers.forEach(publisher => {
        const existingPublisher = publisherReport.find(report => report.id === publisher.id);
        if (!existingPublisher) {
          publisherReport.push({
            id: publisher.id,
            name: publisher.name,
            country: publisher.country,
            bookcount: 0,
            publisherprice: 0
          });
        }
      });
      publisherReport.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    return publisherReport
  } catch (error) {
    throw new Error('Error while fetching publisher report: ' + error)
  }
}

export const savePublisher = (publisher: Publisher) =>
  Publisher.save({ ...publisher })

export const softRemove = async (id: number) => {
  const publisher = await Publisher.findOne({
    where: { id },
    relations: ['bookinstances', 'bookinstances.books'],
  })
  if (publisher) {
    if (publisher.bookinstances.length > 0) {
      throw new Error('Publisher has associated books. Cannot delete.')
    } else {
      return await publisher.softRemove();
      // return publisher
    }
  } else throw new Error('Publisher does not exist.')
}

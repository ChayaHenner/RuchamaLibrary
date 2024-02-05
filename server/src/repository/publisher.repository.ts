import { libraryData } from '../app';
import { Publisher } from '../entities/Publisher';

export const getPublishersDB = async () => {
  const publishers = await libraryData
    .getRepository(Publisher)
    .createQueryBuilder('publisher')
    .select(['publisher.publisher_id', 'publisher.publisher_name'])
    .getMany();

  return publishers;
};

export const postPublisherDB = async (publisher: any) => {
  const newPublisher = Publisher.create({
    publisher_name: publisher.publisher_name,
    country: publisher.country,
  });

  await newPublisher.save();
  return newPublisher;
};

export const softDeleteDB = async (id: number) => {
  const publisher = await Publisher.findOneOrFail({
    where: { publisher_id: id },
  });

  await publisher.softRemove();
  return publisher;
};

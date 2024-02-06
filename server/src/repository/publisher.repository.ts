import { libraryData } from '../app';
import { Publisher } from '../entities/Publisher';

export const getPublishersDB = async () => {
  return await libraryData
    .getRepository(Publisher)
    .createQueryBuilder('publisher')
    .select(['publisher.publisher_id', 'publisher.publisher_name'])
    .getMany();

};

export const postPublisherDB = async (publisher: any) => {
  return Publisher.save({
...publisher  });
};

export const softDeleteDB = async (id: number) => {
  
  const publisher = await Publisher.findOneOrFail({
    where: { publisher_id: id },
  });

  return await publisher.softRemove();

};

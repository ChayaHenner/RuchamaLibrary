import { libraryData } from '../app'
import { Publisher } from '../entities/Publisher'

export const findPublishers =  () => 
  libraryData
    .getRepository(Publisher)
    .createQueryBuilder('publisher')
    .select(['publisher.id', 'publisher.name'])
    .getMany()


export const savePublisher =  (publisher: any) =>   Publisher.save({ ...publisher, })


export const softRemove = async (id: number) => {
  const publisher = await Publisher.findOneOrFail({
    where: { id },
  })

  return await publisher.softRemove()
}

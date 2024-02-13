import { Borrowing } from '../entities/Borrowing'
import { Reader } from '../entities/Reader'
import { FindManyOptions, ILike, Equal } from 'typeorm'

export const findReaders = (searchTerm: string) => {
  const options: FindManyOptions<Reader> = {}
  if (searchTerm) {
    options.where = [
      { name: ILike(`%${searchTerm}%`) },
      { email: ILike(`%${searchTerm}%`) },
      // { id: ILike(`%${id}%`) },
      // { id: Equal(Number(searchTerm)) },
    ]
  }

  return Reader.find(options)
}

export const saveReader = (reader: Reader) => {
  return Reader.save({
    name: reader.name,
    email: reader.email,
    dob: new Date(reader.dob),
  })
}

export const softRemove = async (id: number) => {
  const reader = await Reader.findOne({
    where: { id },
    relations: ['borrowings'],
  })
  
  if (reader) {
    const toReturn = reader.borrowings
      .filter((borrowing: Borrowing) => borrowing.dateReturned === null)
      .map((borrowing: Borrowing) =>  borrowing )

    if (toReturn.length == 0) return await reader.softRemove()
    else throw new Error('Reader has books at home. Cannot delete.');
  } else throw  new Error('reader does not exist')
}

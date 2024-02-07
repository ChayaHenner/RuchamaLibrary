import { Reader } from '../entities/Reader'
import { FindManyOptions, ILike, Equal } from 'typeorm'

export const findReaders =  (searchTerm: string) => {
  const options: FindManyOptions<Reader> = {}
  if (searchTerm) {
    options.where = [
      { name: ILike(`%${searchTerm}%`) },
      { email: ILike(`%${searchTerm}%`) },
      // { id: Equal(Number(searchTerm)) },
    ]
  }

  return  Reader.find(options)
}

export const saveReader =  (reader: any) => {
  return Reader.save({
    name: reader.name,
    email: reader.email,
    dob: new Date(reader.dob),
  })
}

export const softRemove = async (id: number) => {
  const reader = await Reader.findOneOrFail({
    where: { id },
  })
  return await reader.softRemove()
}

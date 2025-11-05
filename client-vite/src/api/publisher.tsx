import { Publisher, PublisherForm, PublisherReport } from '../utils/types'
import { Api } from './index'

export const getPublishers = async () => {
  try {
    const response = await Api.get<Publisher[]>(
      '/publishers/',
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    throw err
  }
}
export const getReport = async () => {
  try {
    const response = await Api.get<PublisherReport[]>(
      '/publishers/report',
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    throw err
  }
}

export const postPublisher = async (publisher: PublisherForm) => {
  console.log(publisher)

  try {
    const response = await Api.post(
      '/publishers',
      publisher,
    )
    return response.data
  } catch (err) {
    console.error(err)
  }
}
export const patchDeletePublisher = async (id: number) => {
  try {
    const response = await Api.patch(
      `/publishers/${id}/soft-delete`,
    )
    // console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

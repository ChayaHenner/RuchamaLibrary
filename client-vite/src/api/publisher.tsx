import { Publisher, PublisherForm, PublisherReport } from '../utils/types'
import axios from 'axios'

export const getPublishers = async () => {
  try {
    const response = await axios.get<Publisher[]>(
      'http://localhost:5000/publishers/',
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    throw err
  }
}
export const getReport = async () => {
  try {
    const response = await axios.get<PublisherReport[]>(
      'http://localhost:5000/publishers/report',
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
    const response = await axios.post(
      'http://localhost:5000/publishers',
      publisher,
    )
    alert('publisher added')
    return response.data
  } catch (err) {
    console.error(err)
  }
}

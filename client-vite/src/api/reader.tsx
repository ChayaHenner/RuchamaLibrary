import { Reader, ReaderForm, ReaderInfo } from '../utils/types'
import { Api } from './index'

export const addReader = async (reader: ReaderForm) => {
  try {
    const response = await Api.post('/readers', reader)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getReaders = async (
  search: string | undefined,
): Promise<Reader[]> => {
  try {
    const response = await Api.get(`/readers`, {
      params: { search: search },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
export const getReaderProfile = async (
  id: string | undefined,
): Promise<ReaderInfo> => {
  try {
    const response = await Api.get(
      `/borrowing/reader/${id}`,
    )
    return response.data
  } catch (error) {
    throw error
  }
}
export const patchDeleteReader = async (id: number) => {
  try {
    const response = await Api.patch(
      `/readers/${id}/soft-delete`,
    )
    // console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

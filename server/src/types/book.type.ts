import { BookInstance } from '../entities/BookInstance'
import { BookInstanceType } from './bookInstance.type'

export type ExistingBook = {
  bookCode: number
  amount: number
}
export type ExistingBookReal = {
  bookCode: number
  amount: number
}
export type NewBook = {
  name: string
  author: string
  price: number
  category: string
  publisher: number
  amount: number
}

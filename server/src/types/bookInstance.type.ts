export type BookInstanceType = {
  name: string
  author: string
  price: number
  category: string
  publisher: number
}
export type returnBooks = {
  borrowIds: number[]
}
export type borrowBooks = {
  ids: number[]
  reader: number
}

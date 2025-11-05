import express from 'express'
import router from './routes/route.const'
import 'reflect-metadata'
import 'dotenv/config'
import { Reader } from './entities/Reader'
import { DataSource } from 'typeorm'
import { Publisher } from './entities/Publisher'
import { Book } from './entities/Book'
import { BookInstance } from './entities/BookInstance'
import { Borrowing } from './entities/Borrowing'
import cors from 'cors'

const app = express()
app.use(cors())
const port = process.env.PORT || 5000

app.use(express.json())

export const libraryData = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [Reader, Publisher, BookInstance, Book, Borrowing],
  synchronize: true,
})


libraryData
  .initialize()
  .then(() => {
    console.log('✅ Database connected')

app.use('/', router)

    app.listen(port, () => {
      console.log(`Server is listening on PORT ${port}`)
    })
  })
  .catch((err) => {
    console.error('Database connection error:', err)
  })

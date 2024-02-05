import express from 'express';
import router from './routes/index'
import "reflect-metadata";
import 'dotenv/config'
import { Reader } from './models/Reader'
import { DataSource } from 'typeorm';
import { Publisher } from './models/Publisher';
import { Book } from './models/Book';
import { BookInstance } from './models/BookInstance';
import { Borrowing } from './models/Borrowing';
const cors = require('cors');

const app = express()
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

export const libraryData = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    entities: [Reader, Publisher, BookInstance, Book, Borrowing],
})

libraryData.initialize().then(()=>{
console.log("database connected");

})


app.use('/',router)

app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`);
});
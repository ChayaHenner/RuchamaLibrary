"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.libraryData = void 0;
const express_1 = __importDefault(require("express"));
const route_const_1 = __importDefault(require("./routes/route.const"));
require("reflect-metadata");
require("dotenv/config");
const Reader_1 = require("./entities/Reader");
const typeorm_1 = require("typeorm");
const Publisher_1 = require("./entities/Publisher");
const Book_1 = require("./entities/Book");
const BookInstance_1 = require("./entities/BookInstance");
const Borrowing_1 = require("./entities/Borrowing");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
exports.libraryData = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    entities: [Reader_1.Reader, Publisher_1.Publisher, BookInstance_1.BookInstance, Book_1.Book, Borrowing_1.Borrowing],
    synchronize: true,
});
exports.libraryData
    .initialize()
    .then(() => {
    console.log('✅ Database connected');
    app.use('/', route_const_1.default);
    app.listen(port, () => {
        console.log(`Server is listening on PORT ${port}`);
    });
})
    .catch((err) => {
    console.error('Database connection error:', err);
});

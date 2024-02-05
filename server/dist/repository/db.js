"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// import { Reader } from '../models/readerModel'
const definitions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '22012024',
    database: 'library',
    synchronize: true,
    logging: false,
    entities: [], //Reader
    migrations: [],
    subscribers: [],
};
async function connectDB() {
    try {
        await (0, typeorm_1.createConnection)(definitions);
        console.log("database connected");
    }
    catch (err) {
        console.error("Error connecting", err);
    }
}
exports.default = connectDB;
// const definitions:ConnectionOptions ={
//     "type": "postgres",
//     "host": "localhost",
//     "port": 5432,
//     "username": "postgres",
//     "password": "22012024",
//     "database": "lib",
//     "synchronize": true,
//     logging: false,
//     entities: [User],
//     migrations: [],
//     subscribers: [],
// }

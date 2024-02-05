"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const readerRouter = express_1.default.Router();
readerRouter.get('/', (req, res) => {
    res.send('reader');
});
exports.default = readerRouter;

'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const books_1 = __importDefault(require('./books'))
const readers_1 = __importDefault(require('./readers'))
const router = express_1.default.Router()
router.get('/', (req, res) => {
  res.send('Welcome to ruchama library')
})
router.use('/books', books_1.default)
router.use('/readers', readers_1.default)
exports.default = router

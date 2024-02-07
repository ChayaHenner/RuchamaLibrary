'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const index_1 = __importDefault(require('./routes/index'))
require('reflect-metadata')
const db_1 = __importDefault(require('./repository/db'))
const app = (0, express_1.default)()
const port = process.env.PORT || 3000
// app.get('/', function (req, res) {
//     res.send('Hello World!!')
// })
;(0, db_1.default)()
app.use('/', index_1.default)
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

const express = require('express')
const router = express.Router()
const Todos = require('./todos')

router.use('/todos', Todos)

module.exports = router
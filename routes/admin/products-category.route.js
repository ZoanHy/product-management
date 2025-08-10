const express = require('express')
const router = express.Router()

const controller = require('../../controller/admin/products-category.controller')

router.get('/', controller.index)

router.get('/create', controller.create)

module.exports = router

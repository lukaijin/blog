const express = require('express')
const router = express.Router()

const indexCtrl = require('../controller/indexCtrl.js')

router.get('/', indexCtrl.showIndexPage)

module.exports = router
const express = require('express')
const router = express.Router()

const userCtrl = require('../controller/userCtrl.js')

router
    .get('/register', userCtrl.showrRegisterPage)
    .post('/register', userCtrl.registerNewUser)
    .get('/login', userCtrl.showLoginPage)
    .post('/login', userCtrl.login)
    .get('/logout', userCtrl.logout)
module.exports = router
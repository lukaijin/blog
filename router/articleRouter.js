const express = require('express')
const router = express.Router()
const articleCtrl = require('../controller/articleCtrl.js')

router
    .get('/article/add', articleCtrl.showArticleAddPage)    // 展示文章添加页面
    .post('/article/add', articleCtrl.addNewArticle)    // 发表新文章
    .get('/article/info', articleCtrl.showInfoPage) // 展示文章详情页面

module.exports = router
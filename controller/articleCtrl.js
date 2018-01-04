const moment = require('moment')
const mditor = require('mditor')
const articleModel = require('../model/articleModel.js')

module.exports = {
    showArticleAddPage(req, res) {
        /*
        在展示添加页面前，先判断当前用户有没有登录，如果没有登录则跳转到登录页；
        （为什么要判断有没有登录：因为每一篇文章都对应唯一的作者，如果没有登录，就无法获取作者Id）
       */
        console.log('showArticleAddPage', req.session.isLogin);
        if (!req.session.isLogin) return res.redirect('/login')
        res.render('./article/add', { 
            isLogin: req.session.isLogin,
            user: req.session.user
        })
    },
    addNewArticle(req, res) {
        let article = req.body
        article.ctime = new Date()
        articleModel.addNewArticle(article, (err, results) => {
            // console.log(results)
            if(err || results.affectedRows !== 1) return res.json({err_code: 1, msg: '文章添加失败'})
            res.json({err_code: 0, id: results.insertId})
        })
    },
    showInfoPage(req, res) {
        let id = req.query.id
        articleModel.getArticleByid(id, (err, results) => {
            if (err || results.length !==1) return res.redirect('/')
            results[0].ctime = moment().format('YYYY-MM-DD hh:mm:ss')
            let parser = new mditor.Parser()
            results[0].content = parser.parse(results[0].content)
            res.render('./article/info', {
                err_code: 0,
                article: results[0],
                isLogin: req.session.isLogin,
                user: req.session.user
            })
        })
    }
}

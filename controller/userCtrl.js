const userModel = require('../model/userModel.js')
const md5 = require('blueimp-md5')
const config = require('../utils/config.js')
module.exports = {
    showrRegisterPage(req, res) { // 显示注册页面
        res.render('./user/register', {})
    },
    registerNewUser(req, res) { // 注册新用户
        let user = req.body
        user.password = md5(user.password, config.pswSalt) //md5加密
        userModel.getUserByName(user.username, (err, results) => { //1-查询用户是否注册过
            if (err) return res.json({
                err_code: 1,
                msg: '注册失败'
            })
            if (results.length !== 0) return res.json({
                err_code: 1,
                msg: '用户名已存在，请更换用户名'
            })
            userModel.registerNewUser(user, (err, results) => { //2-向数据库添加一条新的用户数据
                console.log(results);
                if (err || results.affectedRows !== 1) return res.json({
                    err_code: 1,
                    msg: '注册失败'
                })
                res.json({
                    err_code: 0,
                    msg: '注册成功'
                })
            })
        })
    },
    showLoginPage(req, res) { // 显示登陆页面
        res.render('./user/login', {})
    },
    login(req, res) { //用户登录
        let loginUser = req.body
        loginUser.password = md5(loginUser.password, config.pswSalt)
        userModel.login(loginUser, (err, results) => {
            if (err || results.length !== 1) return res.json({
                err_code: 1,
                msg: '登录失败'
            })
<<<<<<< HEAD
            console.log(req.session);
            req.session.isLogin = true
            req.session.user = results[0]
            console.log('----------------');
            console.log(req.session);
=======
            // console.log(req.session);
            req.session.isLogin = true
            req.session.user = results[0]
            // console.log('----------------');
            // console.log(req.session);
>>>>>>> 添加文章
            res.json({
                err_code: 0,
                msg: '登陆成功'
            })
        })
    },
    logout(req, res) { //注销登录
        req.session.destroy(err => {
            if (err) {
                res.redirect('/')
                console.log('注销失败');
                return
            }
            console.log('注销成功');
            res.redirect('/')
        })
    }
}
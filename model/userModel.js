const connection = require('./baseDb.js')

module.exports = {
    getUserByName (username, callback) {
        let sqlStr = 'select * from users where username=?'
        connection.query(sqlStr, username, (err, results) => {
            if(err) return callback(err)
            callback(null, results)
        })
    },
    registerNewUser(user, callback) {
        let sqlStr = 'insert into users set ?'
        connection.query(sqlStr, user, (err, results) => {
            if(err) return callback(err)
           callback(null, results)
        })
    },
    login(user, callback) {
        let sqlStr = 'select * from users where username=? and password=?'
        connection.query(sqlStr, [user.username, user.password], (err, results) => {
            if(err) return callback(err)
            callback(null, results)
        })
    }
}
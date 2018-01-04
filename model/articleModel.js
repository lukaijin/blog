const connction = require('./baseDb.js')

module.exports = {
    addNewArticle(article, callback) {
        let sqlStr = 'insert into articles set ?'
        connction.query(sqlStr, article, (err, results) => {
            if (err) return callback(err)
            callback(null, results)
        })
    },
    getArticleByid(id, callback) {
        let sqlStr = 'select articles.*,users.nickname from articles LEFT JOIN users on articles.authorId=users.id where articles.id=?'
        connction.query(sqlStr, id, (err, results) => {
            if(err) return callback(err)
            callback(null, results)
        })
    }
}
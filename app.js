const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
const ejs = require('ejs')

// ejs.delimiter = '$';
app.set('view engine', 'ejs')
app.set('views', './views')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

const session = require('express-session')
app.use(session({
    secret: '这是加密的秘钥，写复杂字符串',
    resave: false,
    saveUninitialized: false
}))

fs.readdir(path.join(__dirname, '/router'), (err, fileNames) => {
    if(err) throw err
    fileNames.forEach((filaName) => {
        let filePath =  path.join(__dirname, '/router', filaName)
        app.use(require(filePath))
    })
})


app.use('/node_modules', express.static('node_modules'))

app.listen('3000', '127.0.0.1', ()=>{
    console.log('running', 'http://127.0.0.1:3000/')
})
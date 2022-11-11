import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
import initApiRoute from './route/api'
// import connection from './configs/connectDB'
require('dotenv').config();

var morgan = require('morgan');

// const express = require('express'); // tương tự import thư viện express
// const path = require('path');

const app = express()  // gọi hàm express vào tạo hàm app
const port = process.env.PORT || 3000;   // cổng trên local

app.use((req, res, next) => {
    console.log(req.method);
    next();
})

app.use(morgan('combined'))
// giản lược hóa data gửi lên server, sử dụng phương thức post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

// lúc này app sẽ đc config như trong file configView
// app.get('/', (req, res) => {
//     res.render('test/index.ejs');
// })

// name.get(route, callback)
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
// vd: 
// app.get('/about', (req, res) => {
//     res.send('I\'m Hoang Anh')
// })

// render file html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './index.html'))
// })

// init web route
initWebRoute(app)

// init API route
initApiRoute(app)

// handle 404 not found
app.use((req, res) => {
    res.render('404.ejs')
})

// name.listen(port, callback)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
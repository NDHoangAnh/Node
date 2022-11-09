import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'
// import connection from './configs/connectDB'
require('dotenv').config();

// const express = require('express'); // tương tự import thư viện express
// const path = require('path');

const app = express()  // gọi hàm express vào tạo hàm app
const port = process.env.PORT || 3000;   // cổng trên local

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

// name.listen(port, callback)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
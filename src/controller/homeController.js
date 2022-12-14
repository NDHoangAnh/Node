import { json } from 'body-parser';
import pool from '../configs/connectDB'
import multer from 'multer';
// import path from 'path';


// khi dùng express, controller sẽ nhận 2 tham số đầu vào là request và respond
let getHomepage = async (req, res) => {
    // logic ...
    let data = [];

    // connection.query(
    //     'SELECT * FROM `users` ',
    //     function (err, results, fields) {
    //         // console.log('check mysql');
    //         console.log(results); // results contains rows returned by server
    //         // gán data bằng các row đã tạo trên db
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 address: row.address,
    //                 firstName: row.firstName,
    //                 lastName: row.lastName
    //             })
    //         });
    //         // sử dụng stringify để chuyển từ object -> string
    //         // dùng biến dataUser để truyền sang view
    //         // hiển thị ở file index.ejs
    //         // return res.render('index.ejs', { dataUser: data, test: 'abc string test' });
    //         //console.log(fields); // fields contains extra meta data about results, if available
    //     }
    // );

    // sau khi tạo data xong, truyền qua view
    // truyền bằng tham số thứ 2 trong hàm render, chính là 1 object
    // sử dụng json.stringify để chuyển dạng
    // return res.render('index.ejs', { dataUser: data, test: 'abc string test' });

    // 
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUser: rows, test: 'abc string test' });
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id= ?`, [userId])

    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    // console.log('check request', req.body);
    // req.body là các request được gửi lên server
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?,?,?,?)', [firstName, lastName, email, address]);
    //return res.send('call post create new user');

    // sau khi gửi xong các request, sử dụng redirect để hướng lại về trang home (route đầu tiên)
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id=?', [userId])
    // req.body có các request gửi lên, trong đó có userId (khi delete)
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [id])
    //return res.send(JSON.stringify(user));
    return res.render('update.ejs', { dataUser: user[0] });
}

let postUpdateUser = async (req, res) => {
    // console.log('check request:', req.body);
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName = ? , lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);

    return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

//const upload = multer().single('profile_pic');

//const uploadMultiple = multer().array('multiple_images');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    //upload(req, res, function(err){
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }
    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    //});
}

let handleUploadMultipleFile = async (req, res, error) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getUploadFilePage, handleUploadFile, handleUploadMultipleFile
}
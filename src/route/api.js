import express from "express";
import APIController from '../controller/APIController'

// hàm Router => cho biết router là 1 biến dạng router
let router = express.Router();

// app ở đây chính là express app (được tạo trong file server.js)
const initApiRoute = (app) => {

    router.get('/users', APIController.getAllUsers);

    router.post('/create-user', APIController.createNewUser);

    router.put('/update-user', APIController.updateUser);

    router.delete('/delete-user/:id', APIController.deleteUser);
    // sẽ cho biết website bắt đầu bằng 'localhost:3000/abc'
    // vd:
    // return app.use('/abc', router)
    return app.use('/api/v1/', router)
}
export default initApiRoute;
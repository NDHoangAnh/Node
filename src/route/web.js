import express from "express";
import homeController from '../controller/homeController'
// hàm Router => cho biết router là 1 biến dạng router
let router = express.Router();

// app ở đây chính là express app (được tạo trong file server.js)
const initWebRoute = (app) => {

    router.get('/', homeController.getHomepage)

    router.get('/detail/user/:id', homeController.getDetailPage)

    router.post('/create-new-user', homeController.createNewUser)

    router.get('/about', (req, res) => {
        res.send('I\'m Hoang Anh')
    })

    // sẽ cho biết website bắt đầu bằng 'localhost:3000/abc'
    // vd:
    // return app.use('/abc', router)
    return app.use('/', router)
}
export default initWebRoute;

import connection from '../configs/connectDB'

// khi dùng express, controller sẽ nhận 2 tham số đầu vào là request và respond
let getHomepage = (req, res) => {
    // logic ...
    let data = [];
    connection.query(
        'SELECT * FROM `users` ',
        function (err, results, fields) {
            console.log('check mysql');
            console.log(results); // results contains rows returned by server
            // gán data bằng các row đã tạo trên db
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    address: row.address,
                    firstName: row.firstName,
                    lastName: row.lastName
                })
            });
            // sử dụng stringify để chuyển từ object -> string
            // dùng biến dataUser để truyền sang view
            // hiển thị ở file index.ejs
            return res.render('test/index.ejs', { dataUser: JSON.stringify(data) });
            //console.log(fields); // fields contains extra meta data about results, if available
        }
    );
    // sau khi tạo data xong, truyền qua view
    // truyền bằng tham số thứ 2 trong hàm render, chính là 1 object
    // sử dụng json.stringify để chuyển dạng
}

module.exports = {
    getHomepage
}
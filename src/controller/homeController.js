// khi dùng express, controller sẽ nhận 2 tham số đầu vào là request và respond
let getHomepage = (req, res) => {
    // logic ...
    return res.render('test/index.ejs');
}

module.exports = {
    getHomepage
}
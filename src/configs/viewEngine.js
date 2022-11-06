import express from "express";

const configViewEngine = (app) => {
    // cho phép truy cập thư mục public
    app.use(express.static('./src/public'))

    app.set("view engine", "ejs");
    app.set("views", "./src/views")   // tự động tìm file ejs trong thư mục view
}

export default configViewEngine;
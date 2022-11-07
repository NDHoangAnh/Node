// get the client
import mysql from 'mysql2/promise';

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejsbasic'
// });

console.log('create connect pool');
const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        database: 'nodejsbasic'
    }
)
// simple query
// connection.query(
//     'SELECT * FROM `users` ',
//     function (err, results, fields) {
//         console.log('check mysql');
//         console.log(results); // results contains rows returned by server
//         let rows = results.map((row) => { return row.id })
//         //console.log(fields); // fields contains extra meta data about results, if available
//         console.log(rows);
//     }
// );

// export default connection;
export default pool;


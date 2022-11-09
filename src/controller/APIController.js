import pool from '../configs/connectDB'
let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.status(200).json({
        message: 'Mr.Gon',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: "missing required params"
        })
    }

    await pool.execute('insert into users(firstName, lastName, email, address) values (?,?,?,?)', [firstName, lastName, email, address]);
    return res.status(200).json({
        message: 'ok'
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "missing required params"
        })
    }
    await pool.execute('update users set firstName = ? , lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: "ok1"
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(200).json({
            message: "missing required params id"
        })
    }

    await pool.execute('delete from users where id=?', [userId])
    return res.status(200).json({
        message: "ok3"
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}
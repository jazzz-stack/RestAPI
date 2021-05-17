const {
    create,
    deleteUser,
    getUsers,
    getUsersById,
    updateUser,
    getUsersByUserEmail
} = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken')

module.exports = {

    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                })
            }
            return res.status(200).json({
                status: 1,
                data: result
            })
        })
    },

    getUsersById: (req, res) => {
        let id = req.params.id;
        getUsersById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record is not found!'
                })
            }
            return res.json({
                status: 1,
                data: results
            })
        })
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                status: 1,
                data: results
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 0,
                    message: 'Faild to update user!'
                })
            }
            return res.json({
                status: 1,
                message: "Updated successfully!"
            })
        })
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    status: 0,
                    message: "Record not found"
                })
            }

            return res.json({
                status: 1,
                message: "User deleted successfully!"
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUsersByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!results) {
                return res.json({
                    status:0,
                    data:"Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password=undefined;
                const jsontoken = sign({result:results},"qwe1234",{
                    expiresIn:"1h"
                });
                return res.json({
                    success:1,
                    message:"Login successfully!",
                    token:jsontoken
                });
            }else{
                return res.json({
                    success:0,
                    message:"Invalid email or password!",
                });
            }
        })
    }

}
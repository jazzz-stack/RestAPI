const { createUser,
    deleteUser,
    getUsers,
    getUsersById,
    updateUser,
    login
} = require('./user.controller')
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUsersById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);
router.post("/login", login)
module.exports = router
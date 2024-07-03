const express = require('express')
const { register, Login, Logout } = require('../../controllers/Login/Users')
const { RefreshToken } = require('../../middleware/verifyToken')
const router = express.Router()

router.post('/register', register)
router.post('/login', Login)
router.delete('/logout', Logout)
router.get('/token', RefreshToken)

module.exports = router
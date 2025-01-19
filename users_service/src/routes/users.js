const express = require('express')
const {
  getMe,
  listUsers,
  updateMe,
  deleteMe
} = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/me', authMiddleware, getMe)
router.get('/', authMiddleware, listUsers)
router.put('/me', authMiddleware, updateMe)
router.delete('/me', authMiddleware, deleteMe)

module.exports = router

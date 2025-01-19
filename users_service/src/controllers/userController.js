const { Op } = require('sequelize')
const User = require('../models/User')

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: req.user.id }
      },
      attributes: { exclude: ['password'] }
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.updateMe = async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.name = name || user.name
    user.email = email || user.email
    await user.save()
    const { id, name: userName, email: userEmail, createdAt, updatedAt } = user

    res.json({
      user: { id, name: userName, email: userEmail, createdAt, updatedAt }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.deleteMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await user.destroy()
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

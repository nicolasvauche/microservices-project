const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name, email, password: hashedPassword })
    const {
      id,
      name: userName,
      email: userEmail,
      createdAt,
      updatedAt
    } = newUser

    res.status(201).json({
      user: { id, name: userName, email: userEmail, createdAt, updatedAt }
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secretKey',
      {
        expiresIn: '1h'
      }
    )

    res.json({token})
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error })
  }
}

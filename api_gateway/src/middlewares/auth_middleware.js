const axios = require('axios')

const publicRoutes = ['/api/auth/register', '/api/auth/login']

const verifyTokenPresence = async (req, res, next) => {
  if (publicRoutes.includes(req.originalUrl)) {
    return next()
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization token is missing or malformed' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const tokenValidationRoutes = [
      '/api/tasks',
      '/api/tasks/',
      '/api/remindersgenerate',
    ]

    if (
      tokenValidationRoutes.some(route =>
        matchRoute(req.originalUrl, route, false)
      )
    ) {
      await validateToken(token)

      return next()
    }

    const userDependentRoutes = [
      '/api/tasks/user/{user_id}',
      '/api/reminderslist/{user_id}'
    ]

    if (
      userDependentRoutes.some(route =>
        matchRoute(req.originalUrl, route, true)
      )
    ) {
      const userId = await getUserIdFromToken(token)
      req.params.user_id = userId
      req.url = req.url.replace(/{user_id}/g, userId)
      return next()
    }

    const taskOwnershipRoutes = [
      '/api/tasks/{task_id}',
      '/api/tasks/{task_id}/'
    ]

    if (
      taskOwnershipRoutes.some(route =>
        matchRoute(req.originalUrl, route, true)
      )
    ) {
      const userId = await getUserIdFromToken(token)
      const taskId = extractTaskId(req.originalUrl)

      const taskOwnerId = await getTaskOwnerId(taskId)
      if (!taskOwnerId) {
        return res.status(404).json({ message: 'Task not found' })
      }

      if (taskOwnerId !== userId) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to access this task' })
      }

      return next()
    }

    next()
  } catch (error) {
    console.error(`[ERROR]: ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const validateToken = async token => {
  const response = await axios.get('http://users-service:3000/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

const getUserIdFromToken = async token => {
  const response = await axios.get('http://users-service:3000/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data.id
}

const getTaskOwnerId = async taskId => {
  try {
    const response = await axios.get(
      `http://tasks-service:8000/api/tasks/${taskId}`
    )
    return response.data.user_id
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null
    }
    throw error
  }
}

const extractTaskId = url => {
  const match = url.match(/\/api\/tasks\/(\d+)/)
  return match ? match[1] : null
}

const matchRoute = (url, route, allowParams = false) => {
  const routeRegex = allowParams
    ? new RegExp(route.replace(/{.*?}/g, '\\d+').replace(/\//g, '\\/'))
    : new RegExp(`^${route.replace(/\//g, '\\/')}$`)
  const result = routeRegex.test(url)
  return result
}

module.exports = verifyTokenPresence

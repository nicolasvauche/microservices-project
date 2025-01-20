import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      fetchTasks(token)
    } else {
      router.push('/login')
    }
  }, [router])

  const handleAuthError = () => {
    setError('Session expirée. Veuillez vous reconnecter.')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }

  const fetchTasks = async token => {
    const userId = localStorage.getItem('user_id')
    await axios
      .get(`http://localhost:3001/api/tasks/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        console.error(error)
        if (error.response?.status === 403) {
          handleAuthError()
        } else if (error.response?.status === 401) {
          setError('Identifiants invalides')
        } else if (error.code === 'ERR_NETWORK') {
          setError('Erreur de connexion au serveur')
        } else {
          setError('Erreur serveur')
        }
      })
  }

  const deleteTask = async taskId => {
    const confirmDelete = confirm(
      'Voulez-vous vraiment supprimer cette tâche ?'
    )
    if (!confirmDelete) return

    const token = localStorage.getItem('token')
    await axios
      .delete(`http://localhost:3001/api/tasks/${taskId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
      })
      .catch(error => {
        console.error(error)
        if (error.response?.status === 403) {
          handleAuthError()
        } else if (error.response?.status === 401) {
          setError('Identifiants invalides')
        } else if (error.code === 'ERR_NETWORK') {
          setError('Erreur de connexion au serveur')
        } else {
          setError('Erreur serveur')
        }
      })
  }

  const toggleTaskDone = async (taskId, currentDone) => {
    const token = localStorage.getItem('token')
    const taskToUpdate = tasks.find(task => task.id === taskId)

    const formattedExpiresAt = taskToUpdate.expires_at
      ? new Date(taskToUpdate.expires_at).toISOString()
      : null

    const updatedTask = {
      title: taskToUpdate.title,
      user_id: localStorage.getItem('user_id'),
      done: !currentDone,
      expires_at: formattedExpiresAt
    }

    await axios
      .put(`http://localhost:3001/api/tasks/${taskId}/`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, done: !currentDone } : task
          )
        )
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la tâche :', error)
        if (error.response?.status === 403) {
          handleAuthError()
        } else if (error.response?.status === 401) {
          setError('Identifiants invalides')
        } else if (error.code === 'ERR_NETWORK') {
          setError('Erreur de connexion au serveur')
        } else {
          setError('Erreur serveur')
        }
      })
  }

  const formatDate = dateString => {
    if (!dateString) return 'Non définie'

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Europe/Paris'
    }

    return new Intl.DateTimeFormat('fr-FR', options).format(
      new Date(dateString)
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mes tâches</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id} className={task.done ? 'done' : ''}>
              <div className='task'>
                <input
                  type='checkbox'
                  checked={task.done}
                  onChange={() => toggleTaskDone(task.id, task.done)}
                />
                <strong>
                  #{task.id} {task.title}
                </strong>
                {task.done ? ' (Terminée)' : ' (En cours)'}
              </div>
              <div className='details'>
                <em>Échéance : {formatDate(task.expires_at)}</em>
                <br />
                <a href={`/edit-task/${task.id}`} className='edit'>
                  Modifier
                </a>{' '}
                |{' '}
                <a
                  href='#'
                  onClick={() => deleteTask(task.id)}
                  className='delete'
                >
                  Supprimer
                </a>
              </div>
            </li>
          ))
        ) : (
          <p>Aucune tâche trouvée.</p>
        )}
      </ul>
    </div>
  )
}

export default Home

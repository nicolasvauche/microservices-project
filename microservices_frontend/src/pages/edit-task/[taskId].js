import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const EditTask = () => {
  const [title, setTitle] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { taskId } = router.query

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else if (taskId) {
      fetchTaskDetails(token)
    }
  }, [router, taskId])

  const fetchTaskDetails = async token => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const task = response.data

      setTitle(task.title)
      if (task.expires_at) {
        const utcDate = new Date(task.expires_at)
        const localDate = new Date(
          utcDate.toLocaleString('en-US', { timeZone: 'Europe/Paris' })
        )
        setExpiresAt(localDate.toISOString().slice(0, 16))
      }
    } catch (err) {
      console.error(
        'Erreur lors de la récupération des détails de la tâche :',
        err
      )
      setError('Impossible de charger les détails de la tâche.')
    }
  }

  const handleEditTask = async e => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    let formattedExpiresAt = null
    if (expiresAt) {
      const localDate = new Date(expiresAt)
      const parisDate = new Date(
        localDate.toLocaleString('en-US', { timeZone: 'Europe/Paris' })
      )
      formattedExpiresAt = parisDate.toISOString()
    }

    try {
      await axios.put(
        `http://localhost:3001/api/tasks/${taskId}`,
        {
          title,
          expires_at: formattedExpiresAt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setSuccess(true)
      setError(null)
    } catch (err) {
      console.error('Erreur lors de la modification de la tâche :', err)
      setError('Erreur lors de la modification de la tâche.')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Modifier une tâche</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green' }}>Tâche modifiée avec succès !</p>
      )}
      <form onSubmit={handleEditTask}>
        <div className='form-group'>
          <label>Titre :</label>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Date d'échéance (optionnelle) :</label>
          <input
            type='datetime-local'
            value={expiresAt}
            onChange={e => setExpiresAt(e.target.value)}
          />
        </div>
        <button type='submit'>Modifier</button>
      </form>
    </div>
  )
}

export default EditTask

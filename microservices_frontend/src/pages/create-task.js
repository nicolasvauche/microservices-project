import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const CreateTask = () => {
  const [title, setTitle] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleCreateTask = async e => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')

    let formattedExpiresAt = null
    if (expiresAt) {
      const localDate = new Date(expiresAt)
      const parisDate = new Date(
        localDate.toLocaleString('en-US', { timeZone: 'Europe/Paris' })
      )
      formattedExpiresAt = parisDate.toISOString()
    }

    console.log('Date avant envoi:', formattedExpiresAt)

    await axios
      .post(
        'http://localhost:3001/api/tasks/',
        {
          title,
          user_id: userId,
          done: false,
          expires_at: formattedExpiresAt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        setSuccess(true)
        setTitle('')
        setExpiresAt('')
      })
      .catch(error => {
        console.log(error)

        if (error.status === 401) {
          setError('Identifiants invalides')
        } else if (error.code === 'ERR_NETWORK') {
          setError('Erreur de connexion au serveur')
        } else {
          setError('Erreur serveur')
        }
      })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Créer une nouvelle tâche</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Tâche créée avec succès !</p>}
      <form onSubmit={handleCreateTask}>
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
        <button type='submit'>Créer</button>
      </form>
    </div>
  )
}

export default CreateTask

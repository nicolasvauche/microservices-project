import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Reminders = () => {
  const [reminders, setReminders] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      fetchReminders(token)
    }
  }, [router])

  const fetchReminders = async token => {
    const userId = localStorage.getItem('user_id')
    await axios
      .get(`http://localhost:3001/api/reminderslist/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setReminders(response.data)
        setError(null)
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des rappels :', err)
        setError('Impossible de charger les rappels.')
      })
  }

  const generateReminders = async () => {
    const token = localStorage.getItem('token')
    await axios
      .get('http://localhost:3001/api/remindersgenerate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setSuccess(true)
        setMessage(response.data.message)
        setError(null)
        const userId = localStorage.getItem('user_id')
        fetchReminders(token)
      })
      .catch(err => {
        console.error('Erreur lors de la génération des rappels :', err)
        setError('Erreur lors de la génération des rappels.')
      })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mes rappels</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{message}</p>}
      <button onClick={generateReminders}>Générer les rappels</button>
      <h2>Liste des rappels</h2>
      <ul>
        {reminders.length > 0 &&
          reminders.map(reminder => (
            <li key={reminder.id}>
              <strong>{reminder.title}</strong>
              <br />
              <em>Tâche ID : {reminder.taskId}</em>
              <br />
              <span>Statut : {reminder.sent ? 'Envoyé' : 'Non envoyé'}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Reminders

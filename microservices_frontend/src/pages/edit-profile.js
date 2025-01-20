import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const EditProfile = ({ onProfileUpdate }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      fetchUserProfile(token)
    }
  }, [router])

  const fetchUserProfile = async token => {
    await axios
      .get('http://localhost:3001/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const user = response.data
        setName(user.name || '')
        setEmail(user.email || '')
      })
      .catch(err => {
        console.error('Erreur lors de la récupération des informations :', err)
        setError('Impossible de charger les informations du profil.')
      })
  }

  const handleEditProfile = async e => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    await axios
      .put(
        'http://localhost:3001/api/users/me',
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        setSuccess(true)
        setError(null)
        localStorage.setItem('user_name', name)
        if (onProfileUpdate) {
          onProfileUpdate(name)
        }
      })
      .catch(err => {
        console.error('Erreur lors de la mise à jour du profil :', err)
        setError('Erreur lors de la mise à jour du profil.')
      })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Modifier mon compte utilisateur</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green' }}>
          Les informations du profil ont été mises à jour avec succès !
        </p>
      )}
      <form onSubmit={handleEditProfile}>
        <div className='form-group'>
          <label>Nom :</label>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Email :</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Modifier</button>
      </form>
    </div>
  )
}

export default EditProfile

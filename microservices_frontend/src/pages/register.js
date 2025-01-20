import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleRegister = async e => {
    e.preventDefault()

    await axios
      .post('http://localhost:3001/api/auth/register', {
        name,
        email,
        password
      })
      .then(() => {
        setSuccess(true)
        setError(null)
        setName('')
        setEmail('')
        setPassword('')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
      .catch(err => {
        console.error('Erreur lors de la création du compte :', err)
        if (err.response?.status === 400) {
          setError('Les informations fournies sont invalides.')
        } else if (err.code === 'ERR_NETWORK') {
          setError('Erreur de connexion au serveur.')
        } else {
          setError('Une erreur est survenue.')
        }
      })
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Créer un compte</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green' }}>
          Votre compte a été créé avec succès ! Redirection vers la connexion...
        </p>
      )}
      <form onSubmit={handleRegister}>
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
        <div className='form-group'>
          <label>Mot de passe :</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Créer mon compte</button>
      </form>
    </div>
  )
}

export default Register

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/')
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    await axios
      .post('http://localhost:3001/api/auth/login', {
        email,
        password
      })
      .then(response => {
        const { id, name, token } = response.data
        localStorage.setItem('user_id', id)
        localStorage.setItem('user_name', name)
        localStorage.setItem('token', token)

        if (onLoginSuccess) {
          onLoginSuccess()
        }

        router.push('/')
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
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
          <label>Password :</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

function NavLink ({ href, children }) {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  )
}

function MyApp ({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUserName = localStorage.getItem('user_name')
    setIsAuthenticated(!!token)
    setUserName(storedUserName || '')
  }, [])

  const handleLogout = e => {
    e.preventDefault()

    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user_name')
      setIsAuthenticated(false)
      setUserName('')
      router.push('/login')
    }
  }

  const handleLoginSuccess = () => {
    const storedUserName = localStorage.getItem('user_name')
    setIsAuthenticated(true)
    setUserName(storedUserName || '')
  }

  const handleProfileUpdate = updatedName => {
    localStorage.setItem('user_name', updatedName)
    setUserName(updatedName)
  }

  return (
    <>
      <nav>
        <NavLink href='/'>Accueil</NavLink>
        {!isAuthenticated && (
          <>
          <NavLink href='/login'>Connexion</NavLink>
          <NavLink href='/register'>Inscription</NavLink>
          </>
        )}
        {isAuthenticated && (
          <>
            <NavLink href='/create-task'>Créer une tâche</NavLink>
            <NavLink href='/reminders'>Gérer mes rappels</NavLink>
            <NavLink href='/edit-profile'>Modifier mon compte</NavLink>
            <a href='#' onClick={handleLogout}>
              Déconnexion ({userName})
            </a>
          </>
        )}
      </nav>
      <Component
        {...pageProps}
        onLoginSuccess={handleLoginSuccess}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  )
}

export default MyApp

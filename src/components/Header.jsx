"use client"

import { Navbar, Container, Button } from "react-bootstrap"
import { Bookmark, User } from "lucide-react"
import { useState, useEffect } from "react"

const Header = ({ collectionCount, toggleCollection, toggleLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className={`py-3 fixed-top ${isScrolled ? 'blur-header' : ''}`}
      style={{
        transition: 'all 0.3s ease-in-out',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        backgroundColor: isScrolled ? 'rgba(108, 117, 125, 0.4)' : '#212529'
      }}
    >
      <Container>
        <Navbar.Brand href="/" className="fw-bold">Mi nuevo vicio</Navbar.Brand>
        <div className="d-flex gap-2">
          <Button
            variant="outline-light"
            className="d-flex align-items-center gap-2"
            onClick={toggleCollection}
          >
            <Bookmark size={20} />
            <span>Mi Colección</span>
            {collectionCount > 0 && (
              <span className="badge bg-danger rounded-pill">{collectionCount}</span>
            )}
          </Button>
          <Button
            variant="outline-light"
            className="d-flex align-items-center gap-2"
            onClick={toggleLogin}
          >
            <User size={20} />
            <span>Iniciar Sesión</span>
          </Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header

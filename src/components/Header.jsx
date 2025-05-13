"use client"

import { Navbar, Container, Button } from "react-bootstrap"
import { ShoppingCart, User } from "lucide-react"
import { useState, useEffect } from "react"

const Header = ({ cartCount, toggleCart, toggleLogin }) => {
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
        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center gap-2">
          <img src="/logo.png" alt="Logo" style={{ height: 48, width: 48 }} />
          <span>Mi Nuevo Vicio</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <nav className="ms-3 d-flex align-items-center gap-3">
            <a href="/ofertas" className="nav-link text-light">Ofertas</a>
            <a href="/infaltables" className="nav-link text-light">Infaltables</a>
          </nav>
        </Navbar.Collapse>
        <div className="d-flex gap-2">
          <Button
            variant="outline-light"
            className="d-flex align-items-center gap-2"
            onClick={toggleCart}
          >
            <ShoppingCart size={20} />
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="badge bg-danger rounded-pill">{cartCount}</span>
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

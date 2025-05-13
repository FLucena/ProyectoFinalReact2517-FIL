"use client"

import { Link } from "react-router-dom"
import { ShoppingCart, User } from "lucide-react"

const Header = ({ cartCount, toggleCart, toggleLogin }) => {
  return (
    <header className="fixed-top bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Mi Nuevo Vicio
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ofertas">
                  Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/infaltables">
                  Infaltables
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-light me-2 position-relative"
                onClick={toggleCart}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="btn btn-outline-light"
                onClick={toggleLogin}
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

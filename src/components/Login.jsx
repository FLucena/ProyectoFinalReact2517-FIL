"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const Login = ({ closeLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(email, password)) {
      closeLogin()
    } else {
      alert('Credenciales inválidas')
    }
  }

  return (
    <div
      className="position-fixed top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white rounded shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold m-0">{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
          <button onClick={closeLogin} className="btn btn-sm btn-outline-secondary rounded-circle">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              placeholder="********"
            />
          </div>

          {isRegister && (
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                required={isRegister}
                className="form-control"
                placeholder="********"
              />
            </div>
          )}

          <button type="submit" className="btn btn-danger w-100 py-2 mb-3">
            {isRegister ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => setIsRegister(!isRegister)} className="btn btn-link text-danger p-0">
            {isRegister ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

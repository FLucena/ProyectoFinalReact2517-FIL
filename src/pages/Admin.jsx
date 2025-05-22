"use client"

import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { useState } from "react"

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <div className="list-group">
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Usuarios
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'games' ? 'active' : ''}`}
              onClick={() => setActiveTab('games')}
            >
              Juegos
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Órdenes
            </button>
          </div>
        </div>

        <div className="col-md-9 col-lg-10">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'users' && 'Gestión de Usuarios'}
                {activeTab === 'games' && 'Gestión de Juegos'}
                {activeTab === 'orders' && 'Gestión de Órdenes'}
              </h2>

              {activeTab === 'dashboard' && (
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h5 className="card-title">Total Usuarios</h5>
                        <p className="card-text display-6">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card bg-success text-white">
                      <div className="card-body">
                        <h5 className="card-title">Total Juegos</h5>
                        <p className="card-text display-6">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card bg-info text-white">
                      <div className="card-body">
                        <h5 className="card-title">Total Órdenes</h5>
                        <p className="card-text display-6">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="alert alert-info">
                  No hay usuarios registrados.
                </div>
              )}

              {activeTab === 'games' && (
                <div className="alert alert-info">
                  No hay juegos registrados.
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="alert alert-info">
                  No hay órdenes registradas.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin 
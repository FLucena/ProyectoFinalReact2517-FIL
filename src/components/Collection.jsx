"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"

const Cart = ({ collection, removeFromCollection, closeCollection }) => {
  const total = collection.reduce((sum, item) => sum + (item.price || 0), 0)

  return (
    <div
      className="position-fixed top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-white rounded shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold m-0">Carrito de Compras</h2>
          <button onClick={closeCollection} className="btn btn-sm btn-outline-secondary rounded-circle">
            <X size={20} />
          </button>
        </div>

        {collection.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted mb-3">Tu carrito está vacío</p>
            <button onClick={closeCollection} className="btn btn-primary">
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {collection.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    className="rounded me-3"
                  />
                  <div className="flex-grow-1">
                    <h3 className="fs-6 fw-bold mb-1">{item.title}</h3>
                    <p className="text-muted small mb-0">{item.platform}</p>
                  </div>
                  <button
                    onClick={() => removeFromCollection(item.id)}
                    className="btn btn-sm btn-outline-danger ms-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold">Total:</span>
                <span className="fs-5 fw-bold">${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary w-100 mb-2">
                Proceder al Pago
              </button>
              <button onClick={closeCollection} className="btn btn-outline-secondary w-100">
                Continuar Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart 
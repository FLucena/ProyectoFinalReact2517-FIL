"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"

const Cart = ({ cart, updateQuantity, removeFromCart, closeCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="position-fixed top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
      <div
        className="position-fixed top-0 end-0 bottom-0 bg-white shadow-lg"
        style={{ width: "100%", maxWidth: "400px", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom sticky-top bg-white">
          <h2 className="fs-4 fw-bold m-0">Carrito de Compras</h2>
          <button onClick={closeCart} className="btn btn-sm btn-outline-secondary rounded-circle">
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-secondary mb-3">Tu carrito está vacío</p>
            <button onClick={closeCart} className="btn btn-danger">
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="border-bottom">
              {cart.map((item) => (
                <div key={item.id} className="p-3 border-bottom">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3 bg-light rounded" style={{ width: "80px", height: "80px" }}>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-100 h-100 p-2"
                        style={{ objectFit: "contain" }}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=80&width=80"
                        }}
                      />
                    </div>

                    <div className="flex-grow-1">
                      <h5
                        className="fs-6 mb-1"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.title}
                      </h5>
                      <p className="text-danger fw-bold mb-2">${item.price.toFixed(2)}</p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="input-group input-group-sm" style={{ width: "120px" }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="btn btn-outline-secondary"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="input-group-text bg-white text-center" style={{ width: "40px" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="btn btn-outline-secondary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-sm text-danger"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-top sticky-bottom bg-white">
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold text-danger">${total.toFixed(2)}</span>
              </div>

              <button className="btn btn-danger w-100 py-2">Proceder al Pago</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart

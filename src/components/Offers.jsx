"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { Container, Row, Col, Alert } from "react-bootstrap"

const Offers = ({ products, addToCart, loading, error }) => {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    // Simulamos ofertas con descuentos aleatorios
    const gamesWithOffers = products.map(game => ({
      ...game,
      originalPrice: 29.99,
      discount: Math.floor(Math.random() * 40) + 10, // Descuento entre 10% y 50%
      price: 29.99 * (1 - (Math.floor(Math.random() * 40) + 10) / 100)
    }))
    setOffers(gamesWithOffers)
  }, [products])

  if (loading) {
    return (
      <Container className="py-5">
        <Alert variant="info">Cargando ofertas...</Alert>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Ofertas Especiales</h1>
      <p className="text-muted mb-4">¡Aprovecha estos increíbles descuentos en tus juegos favoritos!</p>
      
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {offers.map((game) => (
          <Col key={game.id}>
            <ProductCard 
              product={game} 
              addToCart={addToCart}
            />
            <div className="text-center mt-2">
              <span className="text-decoration-line-through text-muted me-2">
                ${game.originalPrice.toFixed(2)}
              </span>
              <span className="text-danger fw-bold">
                ${game.price.toFixed(2)}
              </span>
              <span className="badge bg-danger ms-2">
                -{game.discount}%
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Offers 
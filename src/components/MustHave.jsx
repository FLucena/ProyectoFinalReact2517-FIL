"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { Container, Row, Col, Alert, Badge } from "react-bootstrap"

const MustHave = ({ products, addToCart, loading, error }) => {
  const [mustHaveGames, setMustHaveGames] = useState([])

  useEffect(() => {
    // Filtramos juegos populares basados en ciertos criterios
    const popularGames = products
      .filter(game => {
        // Simulamos popularidad basada en el título y género
        const isPopular = 
          game.title.toLowerCase().includes('war') ||
          game.title.toLowerCase().includes('battle') ||
          game.genre.toLowerCase().includes('rpg') ||
          game.genre.toLowerCase().includes('action')
        return isPopular
      })
      .map(game => ({
        ...game,
        price: 39.99, // Precio premium para juegos infaltables
        isMustHave: true
      }))
    setMustHaveGames(popularGames)
  }, [products])

  if (loading) {
    return (
      <Container className="py-5">
        <Alert variant="info">Cargando juegos infaltables...</Alert>
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
      <div className="text-center mb-5">
        <h1 className="mb-3">Juegos Infaltables</h1>
        <p className="text-muted">
          Descubre los títulos más aclamados y populares que no pueden faltar en tu biblioteca
        </p>
      </div>
      
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {mustHaveGames.map((game) => (
          <Col key={game.id}>
            <div className="position-relative">
              <ProductCard 
                product={game} 
                addToCart={addToCart}
              />
              <Badge 
                bg="warning" 
                text="dark" 
                className="position-absolute top-0 start-0 m-2"
              >
                Infaltable
              </Badge>
            </div>
            <div className="text-center mt-2">
              <span className="fw-bold">
                ${game.price.toFixed(2)}
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MustHave 
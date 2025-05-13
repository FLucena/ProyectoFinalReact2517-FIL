"use client"

import { Row, Col } from "react-bootstrap"
import ProductCard from "./ProductCard"

const ProductList = ({ products, addToCart, loading, error }) => {
  console.log('ProductList render:', { products, loading, error });

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No se encontraron juegos
      </div>
    )
  }

  return (
    <div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductList

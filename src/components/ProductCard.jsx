"use client"

import { Card, Button, Badge } from "react-bootstrap"
import { Bookmark } from "lucide-react"

const ProductCard = ({ product, addToCollection }) => {
  const { title, thumbnail, genre, platform, publisher, release_date } = product

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="h-100 shadow-sm hover-shadow transition">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={thumbnail}
          alt={title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg"
          }}
        />
        <Badge 
          bg="primary" 
          className="position-absolute top-0 end-0 m-2"
        >
          {platform}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6 fw-bold mb-2">{title}</Card.Title>
        <div className="mb-2">
          <Badge bg="success" className="me-2">{genre}</Badge>
        </div>
        <Card.Text className="small text-muted mb-2">
          Editor: {publisher}
        </Card.Text>
        <Card.Text className="small text-muted mb-3">
          Fecha de lanzamiento: {formatDate(release_date)}
        </Card.Text>
        <Button
          variant="outline-primary"
          className="mt-auto d-flex align-items-center justify-content-center gap-2"
          onClick={() => addToCollection(product)}
        >
          <Bookmark size={16} />
          Añadir a colección
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard

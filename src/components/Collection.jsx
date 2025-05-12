"use client"

import { Modal, Button, Card, Badge } from "react-bootstrap"
import { X, ExternalLink } from "lucide-react"

const Collection = ({ collection, removeFromCollection, closeCollection }) => {
  return (
    <Modal show={true} onHide={closeCollection} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Mi Colección de Juegos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {collection.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">Tu colección está vacía</h4>
            <p className="text-muted">¡Comienza a añadir juegos a tu colección!</p>
          </div>
        ) : (
          <div className="row g-3">
            {collection.map((game) => (
              <div key={game.id} className="col-md-6">
                <Card>
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={game.thumbnail}
                      alt={game.title}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <Badge 
                      bg="primary" 
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {game.platform}
                    </Badge>
                  </div>
                  <Card.Body>
                    <Card.Title className="fs-6 fw-bold">{game.title}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        href={game.game_url}
                        target="_blank"
                        className="d-flex align-items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        Jugar ahora
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCollection(game.id)}
                        className="d-flex align-items-center gap-1"
                      >
                        <X size={16} />
                        Eliminar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeCollection}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Collection 
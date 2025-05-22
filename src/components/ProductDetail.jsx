import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const ProductDetail = ({ games, loading, error, addToCart, removeFromCart, updateQuantity, cartItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (games && games.length > 0) {
      // Try to find the game with a case-insensitive string comparison
      const foundProduct = games.find(game => 
        String(game.id) === String(id) ||
        (typeof game.id === 'number' && game.id === parseInt(id, 10))
      );
      
      if (foundProduct) {
        console.log("Found game:", foundProduct);
        setProduct(foundProduct);
      } else {
        // If no game is found, create a sample game with the ID
        console.log(`Game with ID ${id} not found. Games available:`, games.length);
        
        const sampleGame = {
          id: id,
          title: `Juego ${id}`,
          thumbnail: 'https://via.placeholder.com/350x200?text=Game+Image',
          description: 'Este es un juego de ejemplo porque no se encontró el juego original en la base de datos.',
          genre: 'Desconocido',
          platform: 'PC',
          publisher: 'Desconocido',
          release_date: new Date().toISOString(),
          price: 29.99
        };
        
        setProduct(sampleGame);
      }
    }
  }, [games, id]);

  useEffect(() => {
    if (cartItems && product) {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (cartItem) {
        setIsAdded(true);
        setQuantity(cartItem.quantity);
      } else {
        setIsAdded(false);
        setQuantity(1);
      }
    }
  }, [cartItems, product]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsAdded(true);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      const prevQuantity = quantity;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity, prevQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    setIsAdded(false);
    setQuantity(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeSinceRelease = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    } catch (e) {
      return "fecha desconocida";
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Error al cargar el juego: {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          No se encontró el juego. <Link to="/" className="alert-link">Volver a la tienda</Link>
        </Alert>
      </Container>
    );
  }

  const { 
    title, 
    thumbnail, 
    description = "Un emocionante juego que te mantendrá al borde de tu asiento. Explora vastos mundos, supera desafíos y vive una experiencia inolvidable.",
    genre, 
    platform, 
    publisher, 
    release_date,
    rating = (Math.random() * 2 + 3).toFixed(1),
    discount = Math.floor(Math.random() * 40),
    price = 29.99
  } = product;

  const discountedPrice = price - (price * (discount / 100));

  return (
    <Container className="py-4">
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>
      </div>

      <Row className="g-4">
        <Col md={5}>
          <div className="position-relative">
            <img
              src={thumbnail}
              alt={title}
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "350px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg";
              }}
            />
            <Badge 
              bg="primary" 
              className="position-absolute top-0 end-0 m-3 fs-6 py-2 px-3"
            >
              {platform}
            </Badge>
          </div>
        </Col>
        
        <Col md={7}>
          <div className="d-flex flex-column h-100">
            <h2 className="display-6 fw-bold mb-2">{title}</h2>
            
            <div className="mb-3">
              <Badge bg="success" className="me-2 py-2 px-3 fs-6">{genre}</Badge>
              <span className="d-inline-flex align-items-center ms-2 text-warning">
                <Star size={18} fill="currentColor" />
                <span className="ms-1 fw-semibold">{rating}</span>
              </span>
            </div>
            
            <div className="mb-3">
              <p className="text-muted mb-1">
                <strong>Desarrollador:</strong> {publisher}
              </p>
              <p className="text-muted mb-1">
                <strong>Lanzamiento:</strong> {formatDate(release_date)} ({getTimeSinceRelease(release_date)})
              </p>
            </div>
            
            <p className="mb-4">{description}</p>
            
            <div className="mt-auto">
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  {discount > 0 && (
                    <Badge bg="danger" className="me-2">-{discount}%</Badge>
                  )}
                  <div>
                    {discount > 0 && (
                      <span className="text-muted text-decoration-line-through me-2">
                        ${price.toFixed(2)}
                      </span>
                    )}
                    <span className="fs-3 fw-bold text-danger">
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {!isAdded ? (
                <Button
                  variant="danger"
                  size="lg"
                  className="d-flex align-items-center gap-2 ps-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  Añadir al carrito
                </Button>
              ) : (
                <div className="d-flex align-items-center">
                  <div className="input-group" style={{ width: "180px" }}>
                    <button
                      onClick={quantity === 1 ? handleRemove : () => handleQuantityChange(quantity - 1)}
                      className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    >
                      {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
                    </button>
                    <span 
                      className="input-group-text bg-white text-center d-flex align-items-center justify-content-center fs-5" 
                      style={{ width: "60px" }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <span className="ms-3 fs-5 fw-bold text-danger">
                    Total: ${(discountedPrice * quantity).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail; 
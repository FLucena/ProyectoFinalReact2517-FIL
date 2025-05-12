const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Mi nuevo vicio</h3>
            <p className="text-secondary">
              Tu plataforma de confianza para descubrir y coleccionar los mejores juegos gratuitos.
            </p>
          </div>

          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Enlaces</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-text-white">
                  Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-text-white">
                  Juegos
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-text-white">
                  Sobre Nosotros
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-secondary text-decoration-none hover-text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h3 className="fs-4 fw-bold mb-3">Contacto</h3>
            <address className="text-secondary mb-0">
              <p className="mb-1">Calle Ejemplo 123</p>
              <p className="mb-1">Ciudad, País</p>
              <p className="mb-1">Email: info@minuevovicio.com</p>
              <p className="mb-1">Teléfono: +123 456 7890</p>
            </address>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-4 text-center text-secondary">
          <p className="mb-0">&copy; {new Date().getFullYear()} Mi nuevo vicio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

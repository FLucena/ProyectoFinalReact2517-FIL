import React from 'react';
import { Pagination } from 'react-bootstrap';

const GameFilters = ({
  searchTerm,
  setSearchTerm,
  selectedPlatform,
  setSelectedPlatform,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  clearFilters,
  hasActiveFilters,
  platforms,
  genres,
  filteredGames,
  totalGames,
  currentPage,
  setCurrentPage,
  totalPages,
  currentPageGames
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
    );

    // Previous page
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Page numbers
    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Next page
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    // Last page
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-4 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control small"
            placeholder="¿Qué vicio te tienta hoy? 🎮"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-3 mb-md-0">
          <select
            className="form-select small"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            <option value="">Todas las Plataformas</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 mb-3 mb-md-0">
          <select
            className="form-select small"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Todos los Géneros</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 mb-3 mb-md-0">
          <select
            className="form-select small"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Ordenar por Título</option>
            <option value="release_date">Ordenar por Fecha</option>
            <option value="genre">Ordenar por Género</option>
          </select>
        </div>
        <div className="col-md-2 mb-3 mb-md-0">
          <button
            className="btn btn-outline-secondary w-100 small"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {totalGames > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="mb-0 text-muted small">
            Mostrando {currentPageGames} de {totalGames} juegos
          </p>
          <Pagination className="mb-0">
            {renderPaginationItems()}
          </Pagination>
        </div>
      )}
    </>
  );
};

export default GameFilters; 
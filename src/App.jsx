"use client"

import { useState, useEffect } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import Cart from "./components/Cart"
import Login from "./components/Login"
import GameFilters from "./components/GameFilters"
import Offers from "./components/Offers"
import MustHave from "./components/MustHave"
import Perfil from "./pages/Perfil"
import Admin from "./pages/Admin"
import { useGames } from "./hooks/useGames"
import { useGameFilters } from "./hooks/useGameFilters"
import { useCart } from "./hooks/useCart"
import { AuthProvider } from "./context/AuthContext"

function App() {
  const { games, loading, error } = useGames();
  const {
    filteredGames,
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
    currentPage,
    setCurrentPage,
    totalPages,
    totalGames,
    currentPageGames
  } = useGameFilters(games);

  const {
    items: cartItems,
    isOpen: isCartOpen,
    addToCart,
    removeFromCart,
    toggleCart,
    closeCart,
    itemCount: cartCount,
    updateQuantity,
    clearCart
  } = useCart();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const [cartShouldRender, setCartShouldRender] = useState(false);

  useEffect(() => {
    if (isCartOpen) setCartShouldRender(true);
  }, [isCartOpen]);

  const handleCartExited = () => setCartShouldRender(false);

  const toggleLogin = () => {
    setIsLoginOpen(true);
    if (isCartOpen) closeCart();
  };

  const showFilters = !['/login', '/perfil', '/admin'].includes(location.pathname);

  let filteredCount = filteredGames.length;
  let totalCount = games.length;

  const gamesWithDiscount = games.map(game => ({
    ...game,
    discount: game.discount ?? Math.floor(Math.random() * 40),
  }));
  const offersFiltered = gamesWithDiscount.filter(game => game.discount > 0);
  let offersFilteredCount = offersFiltered.filter(game => {
    let match = true;
    if (searchTerm) match = match && game.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedPlatform && selectedPlatform !== 'Todas las Plataformas') match = match && game.platform.toLowerCase().includes(selectedPlatform.toLowerCase());
    if (selectedGenre && selectedGenre !== 'Todos los Géneros') match = match && game.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    return match;
  }).length;
  let offersTotalCount = offersFiltered.length;

  const gamesWithRating = games.map(game => ({
    ...game,
    rating: game.rating ?? (Math.random() * 2 + 3),
  }));
  const mustHaveFiltered = gamesWithRating.filter(game => game.rating >= 4.5);
  let mustHaveFilteredCount = mustHaveFiltered.filter(game => {
    let match = true;
    if (searchTerm) match = match && game.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedPlatform && selectedPlatform !== 'Todas las Plataformas') match = match && game.platform.toLowerCase().includes(selectedPlatform.toLowerCase());
    if (selectedGenre && selectedGenre !== 'Todos los Géneros') match = match && game.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    return match;
  }).length;
  let mustHaveTotalCount = mustHaveFiltered.length;

  let pageFilteredCount = filteredCount;
  let pageTotalCount = totalCount;
  if (location.pathname === '/ofertas') {
    pageFilteredCount = offersFilteredCount;
    pageTotalCount = offersTotalCount;
  } else if (location.pathname === '/infaltables') {
    pageFilteredCount = mustHaveFilteredCount;
    pageTotalCount = mustHaveTotalCount;
  }

  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header
          cartCount={cartCount}
          toggleCart={toggleCart}
          toggleLogin={toggleLogin}
        />

        <main className="flex-grow-1" style={{ paddingTop: '6rem' }}>
          {showFilters && (
            <div className="container">
              <GameFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                platforms={platforms}
                genres={genres}
                filteredGames={filteredGames}
                totalGames={totalGames}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                currentPageGames={currentPageGames}
                filteredCount={pageFilteredCount}
                totalCount={pageTotalCount}
              />
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <ProductList 
                  products={filteredGames} 
                  addToCart={addToCart} 
                  removeFromCart={removeFromCart}
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  loading={loading} 
                  error={error} 
                />
              }
            />
            <Route
              path="/ofertas"
              element={
                <Offers 
                  games={games} 
                  addToCart={addToCart} 
                  removeFromCart={removeFromCart}
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  loading={loading} 
                  error={error} 
                  searchTerm={searchTerm}
                  selectedPlatform={selectedPlatform}
                  selectedGenre={selectedGenre}
                />
              }
            />
            <Route
              path="/infaltables"
              element={
                <MustHave 
                  games={games} 
                  addToCart={addToCart} 
                  removeFromCart={removeFromCart}
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  loading={loading} 
                  error={error} 
                  searchTerm={searchTerm}
                  selectedPlatform={selectedPlatform}
                  selectedGenre={selectedGenre}
                />
              }
            />
            <Route
              path="/login"
              element={
                isLoginOpen ? (
                  <Login closeLogin={() => setIsLoginOpen(false)} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>

          {isLoginOpen && (
            <Login closeLogin={() => setIsLoginOpen(false)} />
          )}

          {cartShouldRender && (
            <Cart
              cart={cartItems}
              removeFromCart={removeFromCart}
              closeCart={closeCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
              isOpen={isCartOpen}
              onExited={handleCartExited}
            />
          )}
        </main>

        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App

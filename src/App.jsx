"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import Cart from "./components/Collection"
import Login from "./components/Login"
import GameFilters from "./components/GameFilters"
import Offers from "./components/Offers"
import MustHave from "./components/MustHave"
import { useGames } from "./hooks/useGames"
import { useGameFilters } from "./hooks/useGameFilters"
import { useCart } from "./hooks/useCart"

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
    itemCount: cartCount
  } = useCart();

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    if (isCartOpen) closeCart();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        cartCount={cartCount}
        toggleCart={toggleCart}
        toggleLogin={toggleLogin}
      />

      <main className="flex-grow-1 container" style={{ paddingTop: '6rem' }}>
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
        />

        <Routes future={{ v7_relativeSplatPath: true }}>
          <Route
            path="/"
            element={
              <ProductList 
                products={filteredGames} 
                addToCart={addToCart} 
                loading={loading} 
                error={error} 
              />
            }
          />
          <Route
            path="/ofertas"
            element={
              <Offers 
                products={filteredGames} 
                addToCart={addToCart} 
                loading={loading} 
                error={error} 
              />
            }
          />
          <Route
            path="/infaltables"
            element={
              <MustHave 
                products={filteredGames} 
                addToCart={addToCart} 
                loading={loading} 
                error={error} 
              />
            }
          />
        </Routes>

        {isCartOpen && (
          <Cart
            collection={cartItems}
            removeFromCollection={removeFromCart}
            closeCollection={closeCart}
          />
        )}

        {isLoginOpen && <Login closeLogin={() => setIsLoginOpen(false)} />}
      </main>

      <Footer />
    </div>
  )
}

export default App

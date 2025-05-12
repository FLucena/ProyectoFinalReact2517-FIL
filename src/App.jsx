"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import Collection from "./components/Collection"
import Login from "./components/Login"
import GameFilters from "./components/GameFilters"
import { useGames } from "./hooks/useGames"
import { useGameFilters } from "./hooks/useGameFilters"

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

  const [collection, setCollection] = useState([])
  const [isCollectionOpen, setIsCollectionOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const addToCollection = (game) => {
    const existingItem = collection.find((item) => item.id === game.id)
    if (!existingItem) {
      setCollection([...collection, game])
    }
  }

  const removeFromCollection = (gameId) => {
    setCollection(collection.filter((item) => item.id !== gameId))
  }

  const toggleCollection = () => {
    setIsCollectionOpen(!isCollectionOpen)
    if (isLoginOpen) setIsLoginOpen(false)
  }

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen)
    if (isCollectionOpen) setIsCollectionOpen(false)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        collectionCount={collection.length}
        toggleCollection={toggleCollection}
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

        <Routes>
          <Route
            path="/"
            element={
              <ProductList 
                products={filteredGames} 
                addToCollection={addToCollection} 
                loading={loading} 
                error={error} 
              />
            }
          />
        </Routes>

        {isCollectionOpen && (
          <Collection
            collection={collection}
            removeFromCollection={removeFromCollection}
            closeCollection={() => setIsCollectionOpen(false)}
          />
        )}

        {isLoginOpen && <Login closeLogin={() => setIsLoginOpen(false)} />}
      </main>

      <Footer />
    </div>
  )
}

export default App

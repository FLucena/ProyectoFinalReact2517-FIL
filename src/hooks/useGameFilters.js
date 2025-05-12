import { useState, useEffect } from 'react';

export const useGameFilters = (games) => {
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;

  useEffect(() => {
    let result = [...games];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply platform filter
    if (selectedPlatform) {
      result = result.filter(game => game.platform === selectedPlatform);
    }

    // Apply genre filter
    if (selectedGenre) {
      result = result.filter(game => game.genre === selectedGenre);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "release_date":
          return new Date(b.release_date) - new Date(a.release_date);
        case "genre":
          return a.genre.localeCompare(b.genre);
        default:
          return 0;
      }
    });

    setFilteredGames(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [games, searchTerm, selectedPlatform, selectedGenre, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPlatform("");
    setSelectedGenre("");
    setSortBy("title");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedPlatform || selectedGenre || sortBy !== "title";

  // Get unique platforms and genres for filters
  const platforms = [...new Set(games.map(game => game.platform))];
  const genres = [...new Set(games.map(game => game.genre))];

  // Pagination calculations
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  return {
    filteredGames: paginatedGames,
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
    totalGames: filteredGames.length,
    currentPageGames: paginatedGames.length
  };
}; 
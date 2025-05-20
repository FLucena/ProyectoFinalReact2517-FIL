import { useState, useEffect } from 'react';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const MAX_RETRIES = 3;
      const TIMEOUT_MS = 10000;
      let retryCount = 0;

      const validateGameData = (data) => {
        if (!Array.isArray(data)) {
          throw new Error("Formato de respuesta inválido: se esperaba un array");
        }

        const filteredData = data.filter(game => {
          return (
            typeof game === 'object' &&
            game !== null &&
            typeof game.id === 'number' &&
            typeof game.title === 'string' &&
            typeof game.thumbnail === 'string' &&
            typeof game.genre === 'string' &&
            typeof game.platform === 'string' &&
            typeof game.publisher === 'string' &&
            typeof game.release_date === 'string'
          );
        });
        return filteredData;
      };

      const fetchWithTimeout = async (url, timeout) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
          }
          
          const data = await response.json();
          return validateGameData(data);
        } catch (error) {
          clearTimeout(timeoutId);
          throw error;
        }
      };

      const attemptFetch = async () => {
        try {
          setLoading(true);
          
          // Use a more reliable CORS proxy
          const proxyUrl = "https://api.allorigins.win/raw?url=";
          const targetUrl = "https://www.freetogame.com/api/games";
          const url = `${proxyUrl}${encodeURIComponent(targetUrl)}`;
          
          const data = await fetchWithTimeout(url, TIMEOUT_MS);
          setGames(data);
          setError(null);
        } catch (err) {
          if (err.name === 'AbortError') {
            throw new Error("La solicitud ha excedido el tiempo de espera");
          }
          throw err;
        } finally {
          setLoading(false);
        }
      };

      const retryFetch = async () => {
        while (retryCount < MAX_RETRIES) {
          try {
            await attemptFetch();
            return;
          } catch (err) {
            retryCount++;
            if (retryCount === MAX_RETRIES) {
              const errorMessage = err.message === "La solicitud ha excedido el tiempo de espera"
                ? "La solicitud tardó demasiado en completarse. Por favor, inténtalo de nuevo más tarde."
                : `Error al cargar los juegos después de ${MAX_RETRIES} intentos. Pruebe nuevamente en unos minutos.`;
              setError(errorMessage);
            } else {
              // Exponential backoff
              const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 10000);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
      };

      retryFetch();
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}; 
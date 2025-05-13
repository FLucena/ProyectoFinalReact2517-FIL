import { useState, useEffect } from 'react';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useGames hook initialized');
    const fetchGames = async () => {
      console.log('Starting fetchGames');
      const MAX_RETRIES = 3;
      const TIMEOUT_MS = 10000;
      let retryCount = 0;

      const validateGameData = (data) => {
        console.log('Validating data:', data);
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
        console.log('Filtered data:', filteredData);
        return filteredData;
      };

      const fetchWithTimeout = async (url, timeout) => {
        console.log('Fetching from URL:', url);
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
          
          console.log('Response status:', response.status);
          if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Response data:', data);
          return validateGameData(data);
        } catch (error) {
          console.error('Fetch error:', error);
          clearTimeout(timeoutId);
          throw error;
        }
      };

      const attemptFetch = async () => {
        try {
          setLoading(true);
          console.log('Setting loading to true');
          
          // Try different API endpoints and proxies
          const endpoints = [
            {
              url: "https://api.allorigins.win/raw?url=https://www.freetogame.com/api/games",
              name: "allorigins"
            },
            {
              url: "https://corsproxy.io/?https://www.freetogame.com/api/games",
              name: "corsproxy"
            },
            {
              url: "https://www.freetogame.com/api/games",
              name: "direct"
            }
          ];
          
          let lastError = null;
          
          for (const endpoint of endpoints) {
            try {
              console.log('Attempting with endpoint:', endpoint.name);
              const data = await fetchWithTimeout(
                endpoint.url,
                TIMEOUT_MS
              );
              console.log('Successfully fetched data with', endpoint.name);
              setGames(data);
              setError(null);
              return;
            } catch (err) {
              console.error('Endpoint attempt failed:', endpoint.name, err);
              lastError = err;
            }
          }
          
          throw lastError;
        } catch (err) {
          console.error('All endpoints failed:', err);
          if (err.name === 'AbortError') {
            throw new Error("La solicitud ha excedido el tiempo de espera");
          }
          throw err;
        } finally {
          console.log('Setting loading to false');
          setLoading(false);
        }
      };

      const retryFetch = async () => {
        while (retryCount < MAX_RETRIES) {
          try {
            console.log('Retry attempt:', retryCount + 1);
            await attemptFetch();
            return;
          } catch (err) {
            retryCount++;
            console.error(`Retry ${retryCount} failed:`, err);
            if (retryCount === MAX_RETRIES) {
              const errorMessage = err.message === "La solicitud ha excedido el tiempo de espera"
                ? "La solicitud tardó demasiado en completarse. Por favor, inténtalo de nuevo más tarde."
                : `Error al cargar los juegos después de ${MAX_RETRIES} intentos: ${err.message}`;
              console.error('Setting error:', errorMessage);
              setError(errorMessage);
            } else {
              console.log('Waiting before next retry...');
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        }
      };

      retryFetch();
    };

    fetchGames();
  }, []);

  console.log('Current state:', { games, loading, error });
  return { games, loading, error };
}; 
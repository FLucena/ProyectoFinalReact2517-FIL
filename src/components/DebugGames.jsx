import React from 'react';
import { Container, Table, Alert } from 'react-bootstrap';

const DebugGames = ({ games, loading, error }) => {
  if (loading) {
    return <Container className="py-5">Loading games data...</Container>;
  }

  if (error) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="py-5">
      <h1>Game Data Debug</h1>
      <p>Total games: {games.length}</p>
      
      <h2>First 10 Game IDs:</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>ID Type</th>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {games.slice(0, 10).map((game, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{game.id}</td>
              <td>{typeof game.id}</td>
              <td>{game.title}</td>
              <td>
                <a href={`/product/${game.id}`} target="_blank" rel="noreferrer">
                  View Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DebugGames; 
import React, { useEffect, useState } from 'react';
import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGoods = async (fetchFn: () => Promise<Good[]>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();

      setGoods(result);
    } catch (err) {
      setError((err as Error).message || 'Failed to load goods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoods(getAll);
  }, []);

  return (
    <div className="App">
      <h1>Goods List</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {goods.map(good => (
            <li key={good.id}>{good.name}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => loadGoods(getAll)}>Load All</button>
        <button onClick={() => loadGoods(get5First)}>Load 5 First</button>
        <button onClick={() => loadGoods(getRedGoods)}>Load Red</button>
      </div>
    </div>
  );
};

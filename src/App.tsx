import React, { useState, useCallback } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import * as goodsAPI from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const allGoods = await goodsAPI.getAll();

    setGoods(allGoods);
    setLoading(false);
  }, []);

  const load5First = useCallback(async () => {
    setLoading(true);
    const first5 = await goodsAPI.get5First();

    setGoods(first5);
    setLoading(false);
  }, []);

  const loadRed = useCallback(async () => {
    setLoading(true);
    const redGoods = await goodsAPI.getRedGoods();

    setGoods(redGoods);
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={loadAll}>
        Load all goods
      </button>

      <button type="button" data-cy="first-five-button" onClick={load5First}>
        Load 5 first goods
      </button>

      <button type="button" data-cy="red-button" onClick={loadRed}>
        Load red goods
      </button>

      {loading ? <p>Loading...</p> : <GoodsList goods={goods} />}
    </div>
  );
};

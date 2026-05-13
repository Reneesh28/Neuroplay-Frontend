import { useEffect } from 'react';
import { useUniverseStore } from '../store/universe.store';
import { fetchUniverseMap } from '../services/universe.service';

export const useUniverseData = () => {
  const { setData, setLoading, setError, loading, data, error } = useUniverseStore();

  useEffect(() => {
    const loadData = async () => {
      if (data) return; // Already loaded

      setLoading(true);
      try {
        const universeData = await fetchUniverseMap();
        setData(universeData);
      } catch (err: any) {
        setError(err.message || "An error occurred while loading the neural universe");
      }
    };

    loadData();
  }, [data, setData, setLoading, setError]);

  return { data, loading, error };
};

import { useEffect } from 'react';
import { useUniverseStore } from '../store/universe.store';

export const useRetrievalAnimation = (jobId: string | null) => {
  const { setActiveNodes, data } = useUniverseStore();

  useEffect(() => {
    if (!jobId || !data) return;

    const pollInterval = setInterval(async () => {
      // Here we would fetch the current job status and look for hit_indices
      // For demonstration, we'll simulate a retrieval path every 5 seconds
      const nodes = data?.nodes || [];
      if (nodes.length === 0) return;

      const randomNodes = nodes
        .filter(n => !n.isCore)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        .map(n => n.id);

      setActiveNodes(randomNodes);

      // Reset after 2 seconds
      setTimeout(() => setActiveNodes([]), 2000);
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [jobId, data, setActiveNodes]);
};

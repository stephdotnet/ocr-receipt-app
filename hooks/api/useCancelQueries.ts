import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useCancelQueries = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.clear();
  }, []);
};

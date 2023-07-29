import { useQuery } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { searchUser } from 'api/userApi';

export function useDebouncedSearchUser(searchTerm: string) {
  const { data, refetch, isLoading } = useQuery<IUser[]>({
    queryKey: ["searchUser", searchTerm],
    queryFn: () => searchUser(searchTerm),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.length > 0) {
        refetch();
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  return { data, isLoading, debouncedSearch };
}

import { useQuery } from '@tanstack/react-query';
import { instance } from '../services/instance';

export const useRestaurants = (filters = {}) => {
  return useQuery({
    queryKey: ['restaurants', filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.district) params.append('district', filters.district);
      if (filters.search) params.append('search', filters.search);
      if (filters.isActive !== undefined) params.append('isActive', filters.isActive);

      const url = params.toString()
        ? `/api/restaurants?${params.toString()}`
        : '/api/restaurants';

      const response = await instance.get(url);
      console.log('✅ Restaurants fetched:', response.data.count);
      return response.data.data;
    },
  });
};
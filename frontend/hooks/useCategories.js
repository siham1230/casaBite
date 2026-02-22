import { useQuery } from '@tanstack/react-query';
import { instance } from '../services/instance';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await instance.get('/api/categories');
            console.log('✅ Categories fetched:', response.data.count);
            return response.data.data;
        },
        staleTime: 10 * 60 * 1000,
    });
};
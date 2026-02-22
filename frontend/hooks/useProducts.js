import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { getAllProducts, getProductById, getProductsByRestaurant } from '../services/product';

export const productKeys = {
    all: ['products'],
    detail: (id) => ['products', id],
    byRestaurant: (restaurantId) => ['products', 'restaurant', restaurantId],
};

export const useProducts = (filters = {}) => {
    return useQuery({
        queryKey: productKeys.all,
        queryFn: async () => {
            const result = await getAllProducts(filters);
            if (!result.success) {
                throw new Error(result.message);
            }
            return result.data;
        },
    });
};

export const useProduct = (id) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: async () => {
            if (!id) {
                throw new Error('Product ID is required');
            }

            const result = await getProductById(id);

            if (!result.success) {
                throw new Error(result.message);
            }

            return result.data;
        },
        enabled: !!id,
        retry: 1,
    });
};

export const useProductsByRestaurant = (restaurantId) => {
    return useQuery({
        queryKey: productKeys.byRestaurant(restaurantId),
        queryFn: async () => {
            if (!restaurantId) {
                throw new Error('Restaurant ID is required');
            }

            const result = await getProductsByRestaurant(restaurantId);
            if (!result.success) {
                throw new Error(result.message);
            }

            return result.data;
        },
        enabled: !!restaurantId,
    });
};
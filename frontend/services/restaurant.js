import { instance } from '../services/instance';


export const restaurant = {

    getAllCategories: async () => {
        try {
            const response = await instance.get('/api/categories');
            console.log('✅ Categories fetched:', response.data.count);
            return response.data;
        } catch (error) {
            console.error('❌ Get categories error:', error.response?.data || error.message);
            throw error.response?.data || { error: 'Failed to fetch categories' };
        }
    },

    getRestaurants: async (filters = {}) => {
        try {
            const params = new URLSearchParams();

            if (filters.categoryId) params.append('categoryId', filters.categoryId);
            if (filters.district) params.append('district', filters.district);
            if (filters.search) params.append('search', filters.search);
            if (filters.minRating) params.append('minRating', filters.minRating);
            if (filters.isActive !== undefined) params.append('isActive', filters.isActive);


            const url = params.toString()
                ? `/api/restaurants?${params.toString()}`
                : '/api/restaurants';

            const response = await instance.get(url);
            console.log('✅ Restaurants fetched:', response.data.count);
            return response.data;
        } catch (error) {
            console.error('❌ Get restaurants error:', error.response.data || error.message);
            throw error.response?.data || { error: 'Failed to fetch restaurants' };
        }
    },
    getRestaurantById: async (id) => {
        try {
            const response = await instance.get(`/api/restaurants/${id}`);
            console.log('✅ Get restaurant error:', error.response?.data || error.message);
        } catch (error) {
            console.error('❌ Get restaurant error:', error.response?.data || error.message);
            throw error.response?.data || { error: 'Failed to fetch restaurant' };
        }
    },

    getRestaurantsByCategory: async (categoryId) => {
        try {
            const response = await instance.get(`/api/restaurants/category/${categoryId}`);
            console.log('✅ Restaurants by category fetched:', response.data.count);
            return response.data;
        } catch (error) {
            console.error('❌ Get restaurants by category error:', error.response?.data || error.message);
            throw error.response?.data || { error: 'Failed to fetch restaurants' };
        }
    },
};
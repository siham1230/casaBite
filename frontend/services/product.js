import instance from './instance';

export const getAllProducts = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await instance.get(`/api/products?${params}`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await instance.get(`/api/products/${id}`);
    return response.data;
};

export const getProductsByRestaurant = async (restaurantId) => {
    const response = await instance.get(`/api/products/restaurant/${restaurantId}`);
    return response.data;
};
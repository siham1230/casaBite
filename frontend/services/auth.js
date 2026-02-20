import { instance } from '../services/instance';


export const authService = {
    register: async (userData) => {
        try {
            console.log('📤 Sending registration request:', userData);

            const res = await instance.post("api/auth/register", {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                phone: userData.phone || '',
                address: userData.address || '',
            });
            console.log('✅ Register response:', res.data);
            console.log('📥 Response has token?', !!res.data.token);
            console.log('📥 Response has user?', !!res.data.user);



            return res.data;


        } catch (error) {
            console.log('❌ REGISTER ERROR:', error.response?.data || error.message);

            throw error.response?.data || { error: 'Registration failed' };
        }
    },

    login: async (email, password) => {
        try {
            console.log('Logging in:', email)
            const res = await instance.post('/api/auth/login', {
                email,
                password,
            });
            console.log('✅ Login response:', res.data);

            return res.data;


        } catch (error) {
            console.log("LOGIN ERROR:", error.response?.data || error.message);
            throw error.response?.data || { error: 'Login failed' };

        }
    },

    getCurrentUser: async (token) => {
        try {
            const res = await instance.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('✅ Get user response:', res.data);

            return res.data;
        } catch (error) {
            console.log("GET USER ERROR:", error.response?.data || error.message);

            throw error.response?.data || { error: 'Failed to fetch user' };
        }
    },
    Logout: async () => {
        try {
            const res = await instance.post('/api/auth/logout');
            return res.data;
        } catch (error) {
            throw error.res?.data || { error: 'Logout failed' };
        }
    },

};
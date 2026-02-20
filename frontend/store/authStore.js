import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';
import { instance } from '../services/instance';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,
            error: null,

            setAuth: (user, token) => {
                set({ user, token, loading: true, error: null });

                if (token) {
                    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            },
            login: async (email, password) => {
                set({
                    loading: true,
                    error: null
                });
                try {
                    console.log('🏪 Store: Starting login...');

                    const response = await authService.login(email, password);

                    console.log('🏪 Store: Service returned:', {
                        hasToken: !!response.token,
                        hasUser: !!response.user,
                        success: response.success
                    });
                    if (!response.success) {
                        // console.error('❌ Invalid response format:', response);
                        throw new Error(response.error || 'Login failed');
                    }
                    const { token, user } = response;

                    if (!token || !user) {
                        console.error('❌ Missing token or user:', { token: !!token, user: !!user });
                        throw new Error('Invalid server response');
                    }
                    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    console.log('🏪 Store: Auth header set');

                    set({
                        user,
                        token,
                        loading: false,
                        error: null,
                    });
                    console.log('✅ Store: Login successful!');


                    return { success: true, user };
                } catch (err) {
                    console.error('❌ Store: Login error:', err);

                    const errorMessage = err?.error || err?.message || 'Login failed';

                    set({
                        error: err.message,
                        loading: false,
                    });

                    return { success: false, error: errorMessage };
                }
            },

            register: async (userData) => {
                set({ loading: true, error: null });

                try {
                    console.log('🏪 Store: Calling authService.register');

                    const response = await authService.register(userData);

                    console.log('🏪 Store: Service returned:', {
                        hasToken: !!response.token,
                        hasUser: !!response.user,
                        success: response.success
                    });
                    if (!response.success) {
                        throw new Error(response.error || 'Registration failed');
                    }
                    const { token, user } = response;
                    if (!token || !user) {
                        throw new Error('Invalid server response');
                    }


                    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    set({
                        user,
                        token,
                        loading: false,
                        error: null,
                    });

                    console.log('✅ Store: Registration successful');

                    return { success: true, user };
                } catch (err) {
                    console.error('❌ Store: Registration failed:', err);

                    const errorMessage = err?.error || err?.message || 'Registration failed';

                    set({
                        error: errorMessage,
                        loading: false,
                    });

                    return { success: false, error: errorMessage };
                }
            },

            logout: async () => {
                set({
                    user: null,
                    token: null,
                    error: null,
                });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
            }),
        }
    )
);

import React, { useState, useEffect } from 'react';
import {
    View, Text, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, TextInput, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CategoryList from '../../components/CategoryList';
import RestaurantCard from '../../components/RestaurantCard';
import { useCategories } from '../../hooks/useCategories';
import { useRestaurants } from '../../hooks/useRestaurants';
import { useAuthStore } from '../../store/authStore';



export default function HomeScreen() {
    const { user } = useAuthStore();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: categories = [],
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useCategories();

    const filters = {
        isActive: true,
        ...(selectedCategory && { categoryId: selectedCategory }),
        ...(searchQuery && { search: searchQuery }),
    };

    const {
        data: restaurants = [],
        isLoading: restaurantsLoading,
        error: restaurantsError,
        refetch,
        isRefetching,
    } = useRestaurants(filters);


    if (categoriesLoading || restaurantsLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#e8590c" />
                <Text style={styles.loadingText}>Loading restaurants...</Text>
            </View>
        );
    }


    if (categoriesError || restaurantsError) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>Failed to load data</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="dark" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        tintColor="#e8590c"
                    />
                }
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}! 👋</Text>
                        <Text style={styles.subtitle}>What would you like to eat?</Text>
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search restaurants or cuisines..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Text style={styles.clearIcon}>✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {selectedCategory
                            ? `${categories.find((c) => c.id === selectedCategory)?.name || ''} Restaurants`
                            : 'All Restaurants'}
                    </Text>
                    <Text style={styles.sectionCount}>
                        {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'}
                    </Text>
                </View>

                {restaurants.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🍽️</Text>
                        <Text style={styles.emptyText}>No restaurants found</Text>
                        <Text style={styles.emptySubtext}>Try a different category or search</Text>
                    </View>
                ) : (
                    restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    errorIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#e8590c',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    searchContainer: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    clearIcon: {
        fontSize: 18,
        color: '#999',
        padding: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionCount: {
        fontSize: 14,
        color: '#666',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
    },
});


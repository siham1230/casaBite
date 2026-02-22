import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryItem = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text
            style={[styles.categoryName, isSelected && styles.categoryNameSelected]}
            numberOfLines={1}
        >
            {category.name}
        </Text>
    </TouchableOpacity>
);

export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <CategoryItem
                    category={{ id: null, name: 'All', icon: '🍽️' }}
                    isSelected={selectedCategory === null}
                    onPress={() => onSelectCategory(null)}
                />

                {categories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        isSelected={selectedCategory === category.id}
                        onPress={() => onSelectCategory(category.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
        minWidth: 80,
    },
    categoryItemSelected: {
        backgroundColor: '#fff',
        borderColor: '#e8590c',
    },
    categoryIcon: {
        fontSize: 28,
        marginBottom: 6,
    },
    categoryName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    categoryNameSelected: {
        color: '#e8590c',
    },
});

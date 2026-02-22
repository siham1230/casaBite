import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function RestaurantCard({ restaurant }) {
    const handlePress = () => {
        router.push(`/restaurant/${restaurant.id}`);
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: restaurant.image }}
                style={styles.image}
                resizeMode="cover"
            />

            {/* {restaurant.isFeatured && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ Featured</Text>
        </View>
      )} */}

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {restaurant.name}
                </Text>

                <Text style={styles.description} numberOfLines={2}>
                    {restaurant.description}
                </Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>⭐</Text>
                        <Text style={styles.metaText}>{restaurant.rating || '4.0'}</Text>
                    </View>

                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>🕒</Text>
                        <Text style={styles.metaText}>{restaurant.deliveryTime} min</Text>
                    </View>

                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>🚚</Text>
                        <Text style={styles.metaText}>{restaurant.deliveryCost} MAD</Text>
                    </View>
                </View>

                {restaurant.tags && restaurant.tags.length > 0 && (
                    <View style={styles.tagsRow}>
                        {restaurant.tags.slice(0, 3).map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#f0f0f0',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#e8590c',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    info: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
        fontFamily: 'Comfortaa',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    metaIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    metaText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 6,
        marginTop: 4,
    },
    tagText: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
    },
});
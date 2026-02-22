import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                </View>

                {/* User Info */}
                <View style={styles.userCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
                    <Text style={styles.userEmail}>{user?.email || ''}</Text>
                </View>

                {/* Menu Items */}
                <View style={styles.menu}>
                    <MenuItem
                        icon="👤"
                        title="Edit Profile"
                        onPress={() => console.log('Edit Profile')}
                    />
                    <MenuItem
                        icon="📦"
                        title="My Orders"
                        onPress={() => console.log('My Orders')}
                    />
                    <MenuItem
                        icon="❤️"
                        title="Favorites"
                        onPress={() => console.log('Favorites')}
                    />
                    <MenuItem
                        icon="📍"
                        title="Addresses"
                        onPress={() => console.log('Addresses')}
                    />
                    <MenuItem
                        icon="💳"
                        title="Payment Methods"
                        onPress={() => console.log('Payment Methods')}
                    />
                    <MenuItem
                        icon="⚙️"
                        title="Settings"
                        onPress={() => console.log('Settings')}
                    />
                    <MenuItem
                        icon="❓"
                        title="Help & Support"
                        onPress={() => console.log('Help')}
                    />
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
            <Text style={styles.menuIcon}>{icon}</Text>
            <Text style={styles.menuTitle}>{title}</Text>
        </View>
        <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Comfortaa',
    },
    userCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 32,
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e8590c',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
        fontFamily: 'Comfortaa',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    menu: {
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    menuTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    menuArrow: {
        fontSize: 24,
        color: '#ccc',
    },
    logoutButton: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 20,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e74c3c',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
});
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaFrame, } from 'react-native-safe-area-context';
// import { useCartStore } from '../../store/cartStore';

export default function TabLayout() {
    const { bottom } = useSafeAreaFrame()
    // const cartCount = useCartStore((state) => state.items.length);
    return (
        // <SafeAreaView style={{ flex: 1 }}>

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#e8590c',
                tabBarInactiveTintColor: '#81827C',
                tabBarStyle: {
                    backgroundColor: '#FAFBF5',
                    borderTopColor: '#E5E6DE',
                    borderTopWidth: 1,
                    height: 80,
                    paddingBottom: bottom + 20,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontFamily: 'ato_700Bold',
                    fontSize: 12,

                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="search" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="order" size={size} color={color} />
                    ),
                    tabBarBadge: cartCount > 0 ? cartCount : undefined,

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>

    );

}

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaFrame, } from 'react-native-safe-area-context';

export default function TabLayout() {
    const { bottom } = useSafeAreaFrame()
    // const cartCount = useCartStore((state) => state.items.length);
    return (

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
                        <Ionicons name="search" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" size={size} color={color} />
                    ),

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" size={size} color={color} />),
                }}
            />
        </Tabs>

    );

}

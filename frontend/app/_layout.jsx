import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../providers/QueryClient';
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export default function Layout() {


  useEffect(() => {
    const hydrate = useAuthStore.getState().hydrate;
    if (hydrate) {
      hydrate();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />

        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderRight from '@/components/layout/HeaderRight';
import i18nInit from '@/utils/localisation/i18n';
import theme from '@/utils/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

i18nInit();

function cacheFonts(fonts: (typeof MaterialIcons.font)[]) {
  return fonts.map((font) => Font.loadAsync(font));
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export default function Layout() {
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    async function loadResourcesAndDatAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await cacheFonts([MaterialIcons.font]);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDatAsync();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />

      <GestureHandlerRootView style={{ flex: 1, flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <PaperProvider>
              <Stack
                initialRouteName="index"
                screenOptions={{
                  headerRight: () => <HeaderRight />,
                  headerStyle: {
                    backgroundColor: theme.colors.black,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              >
                <Stack.Screen name="index" options={{ title: 'Overview' }} />
                <Stack.Screen name="login" options={{ title: 'Login' }} />
                <Stack.Screen name="receipts/index" options={{ title: 'All receipts' }} />
                <Stack.Screen name="receipts/[receipt]" options={{ title: 'Receipt' }} />
              </Stack>
            </PaperProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  );
}

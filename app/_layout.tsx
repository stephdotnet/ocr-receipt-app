import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthProvider } from '@/components/layout/AuthProvider';
import HeaderRight from '@/components/layout/HeaderRight';
import i18nInit from '@/utils/localisation/i18n';
import theme from '@/utils/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { useSecureStorageToken } from '@/hooks/auth/useSecureStorageToken';
import { useStore } from '@/hooks/store';

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
  const { getToken } = useSecureStorageToken();
  const { setToken } = useStore();

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        cacheFonts([MaterialIcons.font]);

        const token = await getToken();   
        console.log('TOKEN RETRIEVED', token);
        if(token) {
          setToken(token);
        }             
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1, flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <PaperProvider>
              <AuthProvider>
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
                    contentStyle: {
                      backgroundColor: theme.colors.lightGrey,
                    },
                  }}
                >
                  <Stack.Screen name="index" options={{ title: 'Overview' }} />
                  <Stack.Screen name="login" options={{ title: 'Login' }} />
                  <Stack.Screen name="receipts/index" options={{ title: 'All receipts' }} />
                  <Stack.Screen name="receipts/[id]" options={{ title: 'Receipt' }} />
                </Stack>
              </AuthProvider>
            </PaperProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  );
}

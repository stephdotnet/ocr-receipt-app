import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthProvider } from '@/components/layout/AuthProvider';
import HeaderRight from '@/components/layout/HeaderRight';
import { useSecureStorageToken } from '@/hooks/auth/useSecureStorageToken';
import { useStore } from '@/hooks/store';
import i18nInit from '@/utils/localisation/i18n';
import config from '@/utils/tamagui.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider, Theme, useTheme } from 'tamagui';

i18nInit();

const cacheFonts = async () => {
  await Promise.all([
    Font.loadAsync(MaterialIcons.font),
    Font.loadAsync({ Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf') }),
    Font.loadAsync({ InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf') }),
    Font.loadAsync({ InterLight: require('@tamagui/font-inter/otf/Inter-Light.otf') }),
  ]);
};

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
  const colorScheme = useColorScheme();

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log(error);
      }

      try {
        await cacheFonts();
        const token = await getToken();

        if (token) {
          setToken(token);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const { theme: themeSelected, setTheme } = useStore();

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <StatusBar style={themeSelected === 'dark' ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1, flexGrow: 1 }}>
        <TamaguiProvider config={config}>
          <Theme name={themeSelected}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <StackContainer />
              </AuthProvider>
            </QueryClientProvider>
          </Theme>
        </TamaguiProvider>
      </GestureHandlerRootView>
    </>
  );
}

const StackContainer = () => {
  const theme = useTheme();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerRight: () => <HeaderRight />,
        headerStyle: {
          backgroundColor: theme.background.val,
        },
        headerTintColor: theme.color.val,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Overview' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="receipts/index" options={{ title: 'All receipts' }} />
      <Stack.Screen name="receipts/[id]" options={{ title: 'Receipt' }} />
    </Stack>
  );
};

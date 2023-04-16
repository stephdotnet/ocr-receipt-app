import React, { useEffect } from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import HeaderRight from '@/components/layout/HeaderRight';
import i18nInit from '@/utils/localisation/i18n';
import theme from '@/utils/theme';

i18nInit();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  );
}

function cacheFonts(fonts: (typeof MaterialIcons.font)[]) {
  return fonts.map((font) => Font.loadAsync(font));
}

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
          <PaperProvider>
            <Stack
              initialRouteName="index"
              screenOptions={{
                headerRight: () => <HeaderRight />,
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen name="index" options={{ title: 'Overview' }} />
              <Stack.Screen name="login" options={{ title: 'Login' }} />
            </Stack>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </>
  );
}

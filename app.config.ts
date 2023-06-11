export default () => ({
  expo: {
    name: 'ocr-receipt-native',
    slug: 'ocr-receipt',
    scheme: 'ocr-receipt',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    jsEngine: 'hermes',
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.stepdotnet.ocrreceipt',
    },
    web: {
      bundler: 'metro',
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '11c92cb4-2b07-4456-8db7-c19f0e3d677a',
      },
    },
    owner: 'stephdotnet',
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    updates: {
      url: 'https://u.expo.dev/11c92cb4-2b07-4456-8db7-c19f0e3d677a',
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            unstable_networkInspector: true,
          },
          ios: {
            unstable_networkInspector: true,
          },
        },
      ],
    ],
  },
});

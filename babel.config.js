process.env.TAMAGUI_TARGET = 'native';

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'transform-inline-environment-variables',
        {
          include: 'TAMAGUI_TARGET',
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './utils/tamagui.config.ts',
          logTimings: true,
        },
      ],
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          alias: {
            '@/app': './app',
            '@/hooks': './hooks',
            '@/css': './assets/css',
            '@/pages': './pages',
            '@/components': './components',
            '@/layouts': './layouts',
            '@/types': './types',
            '@/utils': './utils',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
};

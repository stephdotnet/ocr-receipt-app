module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
      'react-native-paper/babel',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
};

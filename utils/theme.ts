import { MD3Colors } from 'react-native-paper';

export default {
  colors: {
    black: '#1F1F1F',
    grey: '#9B9B9B',
    lightGrey: '#E0E0E0',
    white: '#fff',
    blue: '#007ce0',
    navy: '#004175',
    ...MD3Colors,
  },
  space: [0, 4, 8, 16, 32, 64],
  fontSizes: [12, 14, 16, 20, 24, 36],
  lineHeights: {
    small: '16px',
    medium: '24px',
    large: '28px',
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

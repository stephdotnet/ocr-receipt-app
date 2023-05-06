import { Text } from 'react-native';
import styled from 'styled-components';
import { ColorProps, TypographyProps, color, typography, variant } from 'styled-system';

type Variants = 'bold' | 'thin' | 'title1' | 'title2';

export type TextProps = ColorProps & TypographyProps & { variant?: Variants };

export default styled(Text)<TextProps>(
  color,
  typography,
  variant({
    variants: {
      bold: {
        fontWeight: 'bold',
      },
      title1: {
        fontSize: 32,
      },
      title2: {
        fontSize: 22,
      },
      thin: {
        fontSize: 14,
        fontWeight: '300',
      },
    },
  }),
);

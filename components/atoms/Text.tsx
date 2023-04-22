import { Text } from 'react-native';
import styled from 'styled-components';
import { ColorProps, TypographyProps, color, typography, variant } from 'styled-system';

type Variants = 'bold' | 'thin';

export type TextProps = ColorProps & TypographyProps & { variant?: Variants };

export default styled(Text)<TextProps>(
  color,
  typography,
  variant({
    variants: {
      bold: {
        fontWeight: 'bold',
      },
    },
  }),
);

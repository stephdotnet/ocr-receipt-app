import { Text } from 'react-native';
import styled from 'styled-components';
import { color, ColorProps, typography, TypographyProps } from 'styled-system';

export type TextProps = ColorProps & TypographyProps;

export default styled(Text)<TextProps>`
  ${color}
  ${typography}
`;

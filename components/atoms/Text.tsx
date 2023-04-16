import { Text } from 'react-native';
import styled from 'styled-components';
import { ColorProps, TypographyProps, color, typography } from 'styled-system';

export type TextProps = ColorProps & TypographyProps;

export default styled(Text)<TextProps>`
  ${color}
  ${typography}
`;

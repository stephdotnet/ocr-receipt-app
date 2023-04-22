import { View } from 'react-native';
import styled from 'styled-components';
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  PositionProps,
  SpaceProps,
  border,
  color,
  flexbox,
  position,
  space,
} from 'styled-system';

export type BoxProps = SpaceProps & PositionProps & FlexboxProps & BorderProps & ColorProps;

const Box = styled(View)<BoxProps>`
  ${border}
  ${color}
  ${flexbox}
  ${position}
  ${space}
`;

export default Box;

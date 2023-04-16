import { View } from 'react-native';
import styled from 'styled-components';
import { FlexboxProps, PositionProps, SpaceProps, flexbox, position, space } from 'styled-system';

export type BoxProps = SpaceProps & PositionProps & FlexboxProps;

const Box = styled(View)<BoxProps>`
  ${space}
  ${flexbox}
  ${position}
`;

export default Box;

import { View } from 'react-native';
import styled from 'styled-components';
import { space, SpaceProps, position, PositionProps, flexbox, FlexboxProps } from 'styled-system';

export type BoxProps = SpaceProps & PositionProps & FlexboxProps;

const Box = styled(View)<BoxProps>`
  ${space}
  ${flexbox}
  ${position}
`;

export default Box;

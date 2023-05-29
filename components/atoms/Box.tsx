import { View } from 'react-native';
import { GetProps, styled } from 'tamagui';

const Box = styled(View);

export default Box;
export type BoxProps = GetProps<typeof Box>;

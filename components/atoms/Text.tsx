import { Text } from 'react-native';
import { GetProps, styled } from 'tamagui';

const TextComponent = styled(Text, {
  variants: {
    variant: {
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
      error: {
        color: '$red10',
      },
    },
  } as const,
});

export default TextComponent;
export type TextProps = GetProps<typeof TextComponent>;

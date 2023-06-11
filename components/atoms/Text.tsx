import { Text } from 'react-native';
import { GetProps, styled } from 'tamagui';

const TextComponent = styled(Text, {
  name: 'Text',
  color: '$color',
  variants: {
    variant: {
      title1: {
        fontSize: 32,
      },
      title2: {
        fontSize: 22,
      },
      title3: {
        fontSize: 18,
      },
      thin: {
        fontSize: 14,
        fontWeight: 300,
        fontFamily: 'InterLight',
      },
      error: {
        color: '$red10',
      },
    },
  } as const,
});

export default TextComponent;
export type TextComponentProps = GetProps<typeof TextComponent>;

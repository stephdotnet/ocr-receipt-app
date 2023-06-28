import { ThemeableStack, styled } from 'tamagui';

const Skeleton = styled(ThemeableStack, {
  name: 'Skeleton',
  backgroundColor: '$backgroundFocus',
  borderRadius: '$true',
  variants: {
    variant: {
      rounded: {
        borderRadius: '$rounded',
      },
    },
  } as const,
});

export default Skeleton;

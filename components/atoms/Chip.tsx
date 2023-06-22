import { MaterialIcons } from '@expo/vector-icons';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import useTheme from '@/hooks/utils/useTheme';
import { GetProps, ThemeableStack, styled } from 'tamagui';

interface ChipProps extends Omit<GetProps<typeof ThemeableStack>> {
  children: React.ReactNode;
  onClose: () => void;
}

const StyledCard = styled(ThemeableStack, {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: '$2',
  paddingHorizontal: '$3',
  borderRadius: '$true',
  borderColor: '$color6',
  borderWidth: 1,
  hoverTheme: true,
  pressTheme: true,
  focusTheme: true,
});

const HighOrderStyledCard = StyledCard.styleable(
  ({ children, onClose, ...props }: ChipProps, ref) => {
    const theme = useTheme(props.theme);

    return (
      <StyledCard {...props} onPress={onClose}>
        <Box flexDirection="row" flex={1} alignItems="center">
          <Box flex={1}>
            <Text>{children}</Text>
          </Box>
          <Box>
            <MaterialIcons name="close" size={24} color={theme.color10.val} />
          </Box>
        </Box>
      </StyledCard>
    );
  },
);

export default HighOrderStyledCard;
export type HighOrderStyledCardProps = GetProps<typeof HighOrderStyledCard>;

import { MaterialIcons } from '@expo/vector-icons';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';
import useTheme from '@/hooks/utils/useTheme';
import { ThemeName, ThemeableStack, ThemeableStackProps, styled } from 'tamagui';

interface ChipProps extends ThemeableStackProps {
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

const HighOrderStyledCard = ({ children, onClose, ...props }: ChipProps): JSX.Element => {
  const theme = useTheme(props.theme as ThemeName);

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
};

export default HighOrderStyledCard;

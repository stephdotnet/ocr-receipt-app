import Text from '@/components/atoms/Text';
import { useStore } from '@/hooks/store';
import { Button, ButtonProps as ButtonBaseProps, Spinner, useTheme } from 'tamagui';

interface ButtonProps extends ButtonBaseProps {
  loading?: boolean;
  children: React.ReactNode;
}

export default function ButtonComponent({ loading, children, ...props }: ButtonProps) {
  const { theme: storeTheme } = useStore();
  const theme = useTheme({ name: props.theme ?? storeTheme });

  return (
    <>
      <Button {...props}>
        <Text>{children}</Text>
        {loading && <Spinner size="small" color={theme.color10.val} />}
      </Button>
    </>
  );
}

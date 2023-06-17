import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'tamagui';

interface MainContainerProps {
  children: React.ReactNode;
  style?: object;
}

export default function MainContainer({ children, style = {} }: MainContainerProps) {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, style, { backgroundColor: theme.background.val }]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#EEEEEE',
    ...Platform.select({
      web: {
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    }),
  },
});

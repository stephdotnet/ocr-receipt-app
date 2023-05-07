import { Platform, SafeAreaView, StyleSheet } from 'react-native';

interface MainContainerProps {
  children: React.ReactNode;
  style?: object;
}

export default function MainContainer({ children, style = {} }: MainContainerProps) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
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

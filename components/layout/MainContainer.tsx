import { SafeAreaView, StyleSheet } from 'react-native';

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
  },
});

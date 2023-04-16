import { StyleSheet, View } from 'react-native';

interface MainContainerProps {
  children: React.ReactNode;
  style?: object;
}

export default function MainContainer({ children, style = {} }: MainContainerProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#EEEEEE',
  },
});

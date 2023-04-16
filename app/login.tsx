import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Details() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

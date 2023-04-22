import { StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function ReceiptDetails() {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <Text
          onPress={() => {
            router.back();
          }}
        >
          RECEIPTS
        </Text>
      </View>
    </>
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

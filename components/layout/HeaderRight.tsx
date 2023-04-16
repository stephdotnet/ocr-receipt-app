import { Button, Image, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function HeaderRight() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('login')}>
      <MaterialIcons name="account-circle" size={40} color="black" />
    </TouchableOpacity>
  );
}

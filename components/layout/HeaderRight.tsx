import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Text } from '@/components/atoms';
import { useStore } from '@/hooks/store';

export default function HeaderRight() {
  const router = useRouter();
  const { user } = useStore();

  return (
    <TouchableOpacity onPress={() => router.push('login')}>
      {user ? (
        <Box>
          <Text variant="title1" color="white">
            Hi {user.name}
          </Text>
        </Box>
      ) : (
        <MaterialIcons name="account-circle" size={40} color="white" />
      )}
    </TouchableOpacity>
  );
}

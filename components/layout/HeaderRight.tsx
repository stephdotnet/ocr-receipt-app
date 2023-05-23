import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Text } from '@/components/atoms';
import { useLogout, useMe } from '@/hooks/api/useAuth';
import { useStore } from '@/hooks/store';

export default function HeaderRight() {
  const router = useRouter();
  const { user, token } = useStore();
  const logout = useLogout();
  const handleLogout = () => {
    token && logout.mutate(token);
  };
  const { isLoading } = useMe(token);

  return (
    <>
      {user ? (
        <Box>
          <TouchableOpacity onPress={handleLogout}>
            <Box flexDirection="row" alignItems="center">
              <Box>
                <Text variant="title2" color="white">
                  Hi {user.name}
                </Text>
              </Box>
              <Box ml="$2">
                <MaterialIcons name="logout" size={24} color="white" />
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
      ) : isLoading ? (
        <>
          <Text>Loading</Text>
        </>
      ) : (
        <TouchableOpacity onPress={() => router.push('login')}>
          <MaterialIcons name="account-circle" size={40} color="white" />
        </TouchableOpacity>
      )}
    </>
  );
}

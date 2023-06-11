import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Text } from '@/components/atoms';
import { useLogout, useMe } from '@/hooks/api/useAuth';
import { useStore } from '@/hooks/store';
import { useTheme } from 'tamagui';

export default function HeaderRight() {
  const router = useRouter();
  const { user, token } = useStore();
  const logout = useLogout();
  const handleLogout = () => {
    token && logout.mutate(token);
  };
  const { isFetching } = useMe();
  const theme = useTheme();
  const { theme: themeSelected, setTheme } = useStore();

  const handleSwitchTheme = () => {
    if (themeSelected === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <>
      <Box flexDirection="row" alignItems="center">
        <Box mr="$2">
          <TouchableOpacity onPress={handleSwitchTheme}>
            <MaterialIcons name="lightbulb" size={24} color={theme.color.val} />
          </TouchableOpacity>
        </Box>
        {user ? (
          <>
            <Box>
              <Text variant="title3" color={theme.color.val}>
                Hi {user.name}
              </Text>
            </Box>
            <TouchableOpacity onPress={handleLogout}>
              <Box ml="$2">
                <MaterialIcons name="logout" size={24} color={theme.color.val} />
              </Box>
            </TouchableOpacity>
          </>
        ) : isFetching ? (
          <>
            <Text color={theme.color.val}>Loading</Text>
          </>
        ) : (
          <TouchableOpacity onPress={() => router.push('login')}>
            <MaterialIcons name="account-circle" size={40} color={theme.color.val} />
          </TouchableOpacity>
        )}
      </Box>
    </>
  );
}

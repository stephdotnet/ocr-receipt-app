import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Box from '@/components/atoms/Box';
import { getSize } from '@tamagui/get-token/src';
import { Input } from 'tamagui';

export const PasswordInput = ({ ...props }: React.ComponentProps<typeof Input>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const size = getSize(props.size ?? '$true');

  const iconSize = useMemo(() => size?.val / 2, [size]);
  const right = useMemo(() => size?.val / 4, [size]);
  const top = useMemo(() => size?.val / 4, [size]);

  return (
    <Box position={'relative'}>
      <Input {...props} secureTextEntry={secureTextEntry} />
      <TouchableOpacity
        onPress={() => setSecureTextEntry((state) => !state)}
        style={{ position: 'absolute', top, right }}
      >
        <MaterialIcons name="remove-red-eye" size={iconSize} color="black" />
      </TouchableOpacity>
    </Box>
  );
};

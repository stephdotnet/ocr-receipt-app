import React from 'react';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export const PasswordInput = ({ ...props }: React.ComponentProps<typeof TextInput>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <TextInput
      {...props}
      secureTextEntry={secureTextEntry}
      right={
        <TextInput.Icon
          icon={() => <MaterialIcons name="remove-red-eye" size={24} color="black" />}
          onPress={() => setSecureTextEntry((state) => !state)}
        />
      }
    />
  );
};

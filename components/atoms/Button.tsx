import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';

interface ButtonPops {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
}

export default function Button({ children, onPress, style = {} }: ButtonPops) {
  const onPressHandler = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onPressHandler} style={{ width: '100%' }}>
        <View style={[styles.container, style]}>{children}</View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
  },
  touchable: {},
});

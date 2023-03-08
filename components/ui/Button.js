import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/GlobalStyles';

function Button({ children, onPress, buttonStyle, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, buttonStyle, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.secondary300,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
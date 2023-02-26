import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, style, onPress }) => {
  return (
      <Pressable onPress={onPress} style={({pressed}) => [((pressed && onPress) && styles.pressed), styles.buttonContainer, style]}>
        <Ionicons name={icon} size={size} color={color} />
      </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7
}
});
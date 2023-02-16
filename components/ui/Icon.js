import { StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/GlobalStyles";

const IconButton = ({ icon, color, size, style }) => {
  return (

      <View style={[styles.buttonContainer, style]}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: Colors.secondary300,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
});
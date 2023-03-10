import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

const SettingListItem = ({ itemText, icon, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{itemText}</Text>
      <Ionicons name={icon} size={28} color={Colors.secondary300} />
    </Pressable>
  );
};

export default SettingListItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutralGray500,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginRight: 20,
    fontSize: 20,
    color: Colors.neutralGray300,
  },
  pressed: {
    opacity: 0.5,
  },
});

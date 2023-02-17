import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "./ui/Title";
import IconButton from "./ui/IconButton";
import { Colors } from "../constants/GlobalStyles";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Header = ({ children }) => {

  return (
    <View style={styles.container}>
      <Title>{children}</Title>
      <IconButton
        onPress={() => signOut(auth)}
        style={styles.icon}
        icon="log-out-outline"
        size={28}
        color={Colors.secondary300}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    marginTop: 54,
    paddingBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

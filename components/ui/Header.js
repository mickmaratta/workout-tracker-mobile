import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "./Title";
import IconButton from "./IconButton";
import { Colors } from "../../constants/GlobalStyles";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const Header = ({ children, back = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title>{children}</Title>
      {!back && <IconButton
        onPress={() => signOut(auth)}
        style={styles.logoutIcon}
        icon="log-out-outline"
        size={28}
        color={Colors.secondary300}
      />}
      {back && <Pressable onPress={() => navigation.goBack()} style={styles.backIconContainer}>
        <IconButton
          style={styles.backIcon}
          icon="arrow-back-outline"
          size={24}
          color={Colors.secondary300}
        />
        <Text>Back</Text>
      </Pressable>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral800,
    marginTop: 54,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    position: "absolute",
    right: 10,
  },
  backIconContainer: {
    position: "absolute",
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    marginHorizontal: 0,

  }
});

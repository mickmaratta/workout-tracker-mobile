import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Title from "./Title";
import IconButton from "./IconButton";
import { Colors } from "../../constants/GlobalStyles";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

const Header = ({ children, back, logout, favorite }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title>{children}</Title>
      {logout && <IconButton
        onPress={() => signOut(auth)}
        style={styles.rightIcon}
        icon="log-out-outline"
        size={30}
        color={Colors.neutral800}
      />}
      {back && <Pressable onPress={() => navigation.goBack()} style={styles.backIconContainer}>
        <IconButton
          style={styles.backIcon}
          icon="arrow-back-outline"
          size={26}
          color={Colors.neutral800}
        />
        <Text style={styles.backText}>Back</Text>
      </Pressable>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary300,
    marginTop: 0,
    paddingTop: 70,
    paddingBottom: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.secondary300,
    shadowRadius: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
  },
  rightIcon: {
    position: "absolute",
    right: 10,
    top: 85,
  },
  backIconContainer: {
    position: "absolute",
    left: 10,
    top: 85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    marginHorizontal: 0,
  },
  backText: {
    fontWeight: "bold",
    color: Colors.neutral800
  }
});

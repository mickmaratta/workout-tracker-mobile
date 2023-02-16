import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/GlobalStyles";
import AuthForm from "./AuthForm";
import FlatButton from "../ui/FlatButton";
import Title from "../ui/Title";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    //TO DO
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Workout Planner</Title>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? "Create a new user" : "Log in instead"}
          </FlatButton>
        </View>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    marginTop: 62,
    borderRadius: 20,
    justifyContent: "center",
    width: "90%",
  },
  title: {
    color: Colors.secondary300
  },
  authContent: {
    marginTop: 10,
    marginHorizontal: 32,
    paddingVertical: 26,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.backgroundColor500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});

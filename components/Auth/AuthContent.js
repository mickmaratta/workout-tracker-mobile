import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/GlobalStyles";
import AuthForm from "./AuthForm";
import FlatButton from "../ui/FlatButton";
import Title from "../ui/Title";
import IconButton from "../ui/IconButton";

const AuthContent = ({ isLogin, onAuthenticate, error }) => {
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

  //CHECK IF INPUTS ARE VALID
  function submitHandler(credentials) {
    let { email, password, confirmPassword, username } = credentials;
    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length >= 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate(credentials);
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Workout Planner</Title>
      <IconButton
        size={50}
        icon="barbell-outline"
        color={Colors.secondary300}
        style={styles.iconButton}
      />
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          {error && <Text style={styles.errorText}>Oops something went wrong! Try again.</Text>}
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Log in instead"}
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
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  title: {
    color: Colors.secondary300,
    marginBottom: 10,
  },
  iconButton: {
    borderWidth: 2,
    borderColor: Colors.secondary300,
    borderRadius: "100%",
    padding: 10,
  },
  authContent: {
    marginHorizontal: 32,
    marginVertical: 10,
    paddingHorizontal: 16,
    width: "100%",
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  errorText: {
    color: Colors.error500,
    textAlign: "center",
    fontWeight: '200',
    fontSize: 16,
  }
});

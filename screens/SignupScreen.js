import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import Title from "../components/ui/Title";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function signUpHandler() {
    //TO DO
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <AuthContent onAuthenticate={signUpHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      alignItems: "center",
      justifyContent: "center",
    }
})

export default SignupScreen;



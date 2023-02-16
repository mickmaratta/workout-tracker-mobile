import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import Title from "../components/ui/Title";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signUpHandler({email, password, username}) {
    setIsAuthenticating(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Update profile
      await updateProfile(res.user, {
        displayName: username,
      });
      console.log('Signup Success')
    } catch (error) {
      console.log('Login Failed')
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Registering user..." />;
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
      flex: 1,
    }
})

export default SignupScreen;



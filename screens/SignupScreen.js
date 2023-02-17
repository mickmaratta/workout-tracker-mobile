import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { storeUser } from "../util/http";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [err, setErr] = useState(false);

  async function signUpHandler({email, password, username}) {
    setIsAuthenticating(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Update profile
      await updateProfile(res.user, {
        displayName: username,
      });
      //Create user on firestore
      await storeUser({
        uid: res.user.uid,
        displayName: username,
        email,
        createdAt: new Date().getTime(),
        workouts: [],
        favoriteWorkouts: [],
      })
    } catch (error) {
      setErr(true);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Registering user..." />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <AuthContent onAuthenticate={signUpHandler} error={err} />
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



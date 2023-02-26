import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { auth } from "../firebase";

import LoadingOverlay from "../components/ui/LoadingOverlay";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [err, setErr] = useState(false);

  //Login function
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErr(true);
      setIsAuthenticating(false);
    }
  }

  //Loading screen
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AuthContent onAuthenticate={loginHandler} isLogin error={err} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});

export default LoginScreen;

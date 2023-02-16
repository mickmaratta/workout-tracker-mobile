import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { auth } from "../firebase";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login Success')
    } catch (error) {
      console.log('Login Failed')
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <AuthContent onAuthenticate={loginHandler} isLogin />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      alignItems: "center",
      flex: 1,
    }
})

export default LoginScreen;

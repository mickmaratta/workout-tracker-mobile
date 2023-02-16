import { useContext, useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Title from "../components/ui/Title";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function loginHandler() {
    //TO DO
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
      justifyContent: "center",
    }
})

export default LoginScreen;

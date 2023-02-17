import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./constants/GlobalStyles";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AllWorkoutsScreen from "./screens/AllWorkoutsScreen";

const Stack = createNativeStackNavigator();

//Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.primary500 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

//Authenticated Stack
function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllWorkouts" component={AllWorkoutsScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
    <StatusBar style="auto"/>
    <NavigationContainer>
      {!currentUser && <AuthStack />}
      {currentUser && <AuthenticatedStack />}
    </NavigationContainer>
    </>
  );
}
export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

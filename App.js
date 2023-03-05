import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "./constants/GlobalStyles";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { Provider } from "react-redux";
import store from "./redux/store";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AllWorkoutsScreen from "./screens/AllWorkoutsScreen";
import FavoriteWorkoutsScreen from "./screens/FavoriteWorkoutsScreen";
import ManageWorkoutScreen from "./screens/ManageWorkoutScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ViewWorkoutScreen from "./screens/ViewWorkoutScreen";
import IconButton from "./components/ui/IconButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.neutral800 },
        headerTintColor: Colors.secondary300,
        headerTitleStyle: { fontSize: 22 },
        tabBarStyle: { backgroundColor: Colors.neutral800 },
        tabBarActiveTintColor: Colors.primary500,
        tabBarInactiveTintColor: Colors.secondary300,
        headerShown: false,
        headerRight: () => {
          return (
            <IconButton
              onPress={() => signOut(auth)}
              icon="log-out-outline"
              size={28}
              color={Colors.secondary300}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Workouts"
        component={AllWorkoutsScreen}
        options={{
          title: "All Workouts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteWorkoutsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddWorkout"
        component={ManageWorkoutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.neutral800 },
        headerTintColor: Colors.neutral100,
        headerTitleStyle: { fontSize: 22 },
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} 
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen name="ManageWorkout" component={ManageWorkoutScreen}
      options={{
        headerShown: false,
      }}
      /> 
      <Stack.Screen name="ViewWorkout" component={ViewWorkoutScreen} />
    </Stack.Navigator>
  );
}

// Check to see if user is Authenticated
function Navigation() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <StatusBar style="auto" />
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
      <Provider store={store}>
        <Navigation />
      </Provider>
    </AuthContextProvider>
  );
}

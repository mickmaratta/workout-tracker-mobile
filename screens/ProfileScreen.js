import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Header from "../components/ui/Header";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../constants/GlobalStyles";
import BigWidget from "../components/Profile/BigWidget";
import SmallWidget from "../components/Profile/SmallWidget";
import { useSelector } from "react-redux";
import { allCompletedWorkouts } from "../redux/completedWorkoutsSlice";
import IconButton from "../components/ui/IconButton";

const ProfileScreen = ( {navigation} ) => {
  const { currentUser } = useContext(AuthContext);
  const completedWorkouts = useSelector(allCompletedWorkouts);
  const numOfWorkouts = completedWorkouts.length;

  return (
    <View>
      <Header>Profile</Header>
      <IconButton
        icon="settings"
        size={28}
        color={Colors.secondary300}
        style={styles.settingsIcon}
        onPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{currentUser.displayName}</Text>
        <View style={styles.widgetContainer}>
          <BigWidget numOfWorkouts={numOfWorkouts} />
          <View style={styles.smWidgetContainer}>
            <SmallWidget />
            <SmallWidget />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  settingsIcon: {
    position: "absolute",
    right: 15,
    top: 80,
  },
  title: {
    fontSize: 30,
  },
  widgetContainer: {
    marginTop: 15,
  },
  smWidgetContainer: {
    flexDirection: "row",
  },
});

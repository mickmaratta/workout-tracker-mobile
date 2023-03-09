import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import Header from "../components/ui/Header";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../constants/GlobalStyles";
import BigWidget from "../components/Profile/BigWidget";
import SmallWidget from "../components/Profile/SmallWidget";
import { useSelector } from "react-redux";
import { allCompletedWorkouts } from "../redux/completedWorkoutsSlice";
import IconButton from "../components/ui/IconButton";
import { DonutChart } from "react-native-circular-chart";
import { calcAverageWorkoutLength, calcLongestWorkout, calcRecentWorkouts, calcWorkoutEfficiency } from "../util/helpers";

const ProfileScreen = ( {navigation} ) => {
  const { currentUser } = useContext(AuthContext);
  const completedWorkouts = useSelector(allCompletedWorkouts);

  const numOfWorkouts = completedWorkouts.length;
  const workoutEfficiency = calcWorkoutEfficiency(completedWorkouts);
  const recentWorkouts = calcRecentWorkouts(completedWorkouts);
  const longestWorkout = calcLongestWorkout(completedWorkouts);
  const avgWorkoutDuration = calcAverageWorkoutLength(completedWorkouts)


  return (
    <View>
      <Header>{currentUser.displayName ? currentUser.displayName : 'Your Profile'}</Header>
      <IconButton
        icon="settings"
        size={28}
        color={Colors.neutral800}
        style={styles.settingsIcon}
        onPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.container}>
        <View style={styles.widgetContainer}>
          <BigWidget workoutEfficiency={workoutEfficiency} />
          <View style={styles.smWidgetContainer}>
            <SmallWidget>
            
            </SmallWidget>
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
  donutChart: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  labelValue: {
    display: "none",
  },
});

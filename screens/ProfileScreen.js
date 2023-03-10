import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/ui/Header";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../constants/GlobalStyles";
import LargeWidget from "../components/Profile/LargeWidget";
import SmallWidget from "../components/Profile/SmallWidget";
import { useSelector } from "react-redux";
import { allCompletedWorkouts } from "../redux/completedWorkoutsSlice";
import IconButton from "../components/ui/IconButton";
import {
  calcAverageWorkoutLength,
  calcLongestWorkout,
  calcRecentWorkouts,
  calcWorkoutEfficiency,
} from "../util/helpers";
import MediumWidget from "../components/Profile/MediumWidget";
import Title from "../components/ui/Title";

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const completedWorkouts = useSelector(allCompletedWorkouts);
  const numOfWorkouts = completedWorkouts.length;
  const [workoutEfficiency, setWorkoutEfficiency] = useState(
    calcWorkoutEfficiency(completedWorkouts, "recent")
  );
  const [workoutEfficiencyDesc, setWorkoutEfficiencyDesc] =
    useState("14 DAYS");
  const recentWorkouts = calcRecentWorkouts(completedWorkouts);
  const longestWorkout = calcLongestWorkout(completedWorkouts);
  const avgWorkoutDuration = calcAverageWorkoutLength(completedWorkouts);

  function handleSelector(recent) {
    setWorkoutEfficiency(
      recent === "ALL TIME"
        ? calcWorkoutEfficiency(completedWorkouts, "recent")
        : calcWorkoutEfficiency(completedWorkouts)
    );
    setWorkoutEfficiencyDesc(
      workoutEfficiencyDesc === "ALL TIME" ? "14 DAYS" : "ALL TIME"
    );
  }

  return (
    <View style={styles.container}>
      <Header>
        {currentUser.displayName ? currentUser.displayName : "Your Profile"}
      </Header>
      <IconButton
        icon="settings"
        size={28}
        color={Colors.neutral800}
        style={styles.settingsIcon}
        onPress={() => navigation.navigate("Settings")}
      />
      {completedWorkouts.length === 0 && (
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyText}>
            You haven't completed any workouts yet
          </Text>
          <Text style={styles.emptyText}>
            Check back after your first workout to see your stats.
          </Text>
        </View>
      )}
      <Text style={styles.title}>Your Stats</Text>
      {completedWorkouts.length > 0 && (
        <View style={styles.widgetContainer}>
          <LargeWidget
            workoutEfficiency={workoutEfficiency}
            onPress={handleSelector}
            selectorDesc={workoutEfficiencyDesc}
          />
          <MediumWidget
            longestWorkout={longestWorkout}
            avgWorkoutDuration={avgWorkoutDuration}
          />
          <View style={styles.smWidgetContainer}>
            <SmallWidget
              value={recentWorkouts}
              desc="Last 14 Days"
              mode="light"
            />
            <SmallWidget
              value={numOfWorkouts}
              desc="Total Workouts"
              mode="light"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsIcon: {
    position: "absolute",
    right: 15,
    top: 80,
  },
  emptyTextContainer: {
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 10,
    color: Colors.secondary300,
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    fontWeight: "bold",
  },
  widgetContainer: {
    margin: 15,
    flex: 1,
  },
  smWidgetContainer: {
    flexDirection: "row",
    height: "35%",
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

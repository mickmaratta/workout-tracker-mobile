import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import WorkoutLabel from "./WorkoutLabel";
import { useNavigation } from "@react-navigation/native";

const WorkoutList = ({ workouts }) => {
  const navigation = useNavigation();

  function handlePress(workout) {
    navigation.navigate("ViewWorkout", { workout });
  }
  return (
    <View>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutLabel workout={item} onPress={() => handlePress(item)} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default WorkoutList;

const styles = StyleSheet.create({});

import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SwitchSelector from "../components/ui/SwitchSelector";
import ExerciseLabel from "../components/Workouts/ExerciseLabel";
import { Colors } from "../constants/GlobalStyles";
import Set from "../components/Workouts/Set";
import Header from "../components/ui/Header"

const ViewWorkoutScreen = ({ route, navigation }) => {
  const { workout } = route.params;
  const [collapsed, setCollapsed] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: workout.title,
    });
  }, []);
  function handleCollapse(value) {
    setCollapsed(value);
  }

  return (
    <View>
      <Header back={true}>{workout.title}</Header>
      <SwitchSelector
        left="Collapsed"
        right="Expanded"
        onPress={handleCollapse}
      />
      <View>
        <FlatList
          data={workout.exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
          <>
          <ExerciseLabel exercise={item} />
          {!collapsed && item.sets.map((set) => (
            <Set key={set.number} set={set}/>
          ))}
          </>
          )}
        />
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.descTitle}>Description:</Text>
        <Text style={styles.descText}>{workout.desc}</Text>
      </View>
    </View>
  );
};

export default ViewWorkoutScreen;

const styles = StyleSheet.create({
  descContainer: {
    textAlign: "center",
    margin: 10,
  },
  descTitle: {
    fontSize: 20,
    color: Colors.secondary300,
    marginBottom: 5
  },
  descText: {
    fontSize: 16,
    color: Colors.secondary300,
  },
});
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import SwitchSelector from "../components/ui/SwitchSelector";
import ExerciseLabel from "../components/Workouts/ExerciseLabel";
import { Colors } from "../constants/GlobalStyles";
import Set from "../components/Workouts/Set";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";

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
    <View style={styles.container}> 
      <Header back={true}>{workout.title}</Header>
      <SwitchSelector
        left="Collapsed"
        right="Expanded"
        onPress={handleCollapse}
      />
      <View style={styles.container}>
        <View>
          <FlatList
            data={workout.exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <ExerciseLabel exercise={item} />
                {!collapsed &&
                  item.sets.map((set) => <Set key={set.number} set={set} />)}
              </>
            )}
          />
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descTitle}>Description:</Text>
          <Text style={styles.descText}>{workout.desc}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button buttonStyle={styles.editButton}>Edit</Button>
        <Button buttonStyle={styles.deleteButton}>Delete</Button>
      </View>
    </View>
  );
};

export default ViewWorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descContainer: {
    textAlign: "center",
    margin: 10,
  },
  descTitle: {
    fontSize: 20,
    color: Colors.secondary300,
    marginBottom: 5,
  },
  descText: {
    fontSize: 16,
    color: Colors.secondary300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 36,
  },
  editButton: {
    width: "30%",
  },
  deleteButton: {
    backgroundColor: Colors.error500,
    width: "30%",
  },
});

import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import SwitchSelector from "../components/ui/SwitchSelector";
import ExerciseLabel from "../components/Workouts/ExerciseLabel";
import { Colors } from "../constants/GlobalStyles";
import Set from "../components/Workouts/Set";
import Header from "../components/ui/Header";
import Button from "../components/ui/Button";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {
  addDatabaseFavorite,
  deleteDatabaseFavorite,
  deleteDatabaseWorkout,
} from "../util/http";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteReduxWorkout } from "../redux/workoutsSlice";
import IconButton from "../components/ui/IconButton";
import {
  addReduxFavorite,
  allFavWorkouts,
  deleteReduxFavorite,
} from "../redux/favoritesSlice";

const ViewWorkoutScreen = ({ route, navigation }) => {
  const { workout } = route.params;
  const { currentUser } = useContext(AuthContext);
  const userToken = currentUser.stsTokenManager.accessToken;
  const [collapsed, setCollapsed] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const favWorkouts = useSelector(allFavWorkouts);
  const [isFavorite, setIsFavorite] = useState(
    favWorkouts.includes(workout._id)
  );
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: workout.title,
    });
  }, []);

  function handleCollapse(value) {
    setCollapsed(value);
  }

  function handleDeleteAlert() {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDelete() },
      ]
    );
  }
  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteDatabaseWorkout(workout._id, currentUser.uid, userToken);
      await deleteDatabaseFavorite(workout._id, currentUser.uid, userToken);
      dispatch(deleteReduxWorkout(workout._id));
      dispatch(deleteReduxFavorite(workout._id));
      navigation.navigate("Workouts");
    } catch (error) {}
  }

  async function handleFavorite() {
    const favToAdd = {
      id: workout._id,
    };
    try {
      if (isFavorite) {
        await deleteDatabaseFavorite(workout._id, currentUser.uid, userToken);
        dispatch(deleteReduxFavorite(workout._id));
        setIsFavorite(false);
      } else {
        await addDatabaseFavorite(workout._id, currentUser.uid, favToAdd, userToken);
        dispatch(addReduxFavorite(workout._id));
        setIsFavorite(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Loading Screen
  if (isDeleting) {
    return <LoadingOverlay message="Deleting Workout..." />;
  }

  return (
    <View style={styles.container}>
      <Header back={true} favorite={true} favoriteOnPress={handleFavorite} small={true}>
        {workout.title}
      </Header>
      <IconButton
        onPress={handleFavorite}
        style={styles.favIcon}
        icon={isFavorite ? "star" : "star-outline"}
        size={26}
        color={Colors.neutral800}
      />
      <SwitchSelector
        left="Collapsed"
        right="Expanded"
        onPress={handleCollapse}
      />
      <ScrollView style={styles.container}>
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
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button buttonStyle={styles.deleteButton} onPress={handleDeleteAlert}>
          Delete
        </Button>
        <Button
          buttonStyle={styles.trackButton}
          textStyle={styles.trackButtonText}
          onPress={() => {
            navigation.navigate("TrackWorkouts", { workout });
          }}
        >
          Track
        </Button>
        <Button
          buttonStyle={styles.editButton}
          onPress={() => navigation.navigate("ManageWorkout", { workout })}
        >
          Edit
        </Button>
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
    alignItems: "center",
    marginBottom: 65,
    marginTop: 20,
  },
  editButton: {
    width: "30%",
  },
  trackButton: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: Colors.primary500,
    justifyContent: "center",
    shadowColor: Colors.secondary300,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
  },
  trackButtonText: {
    paddingVertical: 6,
    color: Colors.secondary300,
    fontWeight: "bold",
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: Colors.error700,
    width: "30%",
  },
  favIcon: {
    position: "absolute",
    right: 15,
    top: 65,
  },
});

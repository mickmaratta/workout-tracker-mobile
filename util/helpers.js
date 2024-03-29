import { Keyboard, TouchableWithoutFeedback } from "react-native";

// Hide that keyboard!
export const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

//Sort workouts
export function sortWorkouts(workouts, direction) {
  if (workouts.length === 0) {
    return;
  }
  if (direction === "recent") {
    workouts.sort((a, b) => b.createdAt - a.createdAt);
  } else {
    workouts.sort((a, b) => a.createdAt - b.createdAt);
  }
  return workouts;
}

//FORMAT WORKOUT DURATION
export function formatWorkoutDuration(time) {
  const minutes = (time / 60).toFixed();
  const displayedSeconds = time % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    displayedSeconds < 10 ? `0${displayedSeconds}` : displayedSeconds;
  const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  return formattedTime;
}

//CALCULATE TOTAL NUMBER OF SETS IN A WORKOUT
export function calcNumOfSets(exercises) {
  let numOfSets = 0;
  exercises.map((exercise) => {
    numOfSets = numOfSets + exercise.sets.length;
  });
  return numOfSets;
}

//PROFILE FUNCTIONS
// EFFFICIENCY
export function calcWorkoutEfficiency(workouts, recent) {
  let date = new Date();
  date.setDate(date.getDate() - 14);
  date = date.getTime();
  let totalSets = 0;
  let completedSets = 0;
  let filteredWorkouts = workouts;
  if (recent === "recent") {
    filteredWorkouts = workouts.filter((workout) => workout.createdAt > date);
  }
  filteredWorkouts.map((workout) => {
    totalSets = workout.sets.totalSets + totalSets;
    completedSets = workout.sets.completedSets + completedSets;
  });
  const workoutEfficiency = {
    totalSets: totalSets,
    completedSets: completedSets,
    efficiency: ((completedSets / totalSets) * 100).toFixed(0),
  };
  return workoutEfficiency;
}

// LAST 14 DAYS
export function calcRecentWorkouts(workouts) {
  let date = new Date();
  date.setDate(date.getDate() - 14);
  date = date.getTime();
  const recentWorkouts = workouts.filter((workout) => workout.createdAt > date);
  return recentWorkouts.length;
}

// LONGEST WORKOUT
export function calcLongestWorkout(workouts) {
  let longestWorkout = workouts.reduce((prev, current) => (+prev.duration > +current.duration) ? prev : current, 0)
  let duration = formatWorkoutDuration(longestWorkout.duration);
  return duration;
}

// AVG WORKOUT
export function calcAverageWorkoutLength(workouts) {
  let totalTime = 0;
  workouts.map((workout) => {
    let workoutDuration = workout.duration;
    workoutDuration = +workoutDuration;
    totalTime = workoutDuration + totalTime;
  });
  const avgSeconds = (totalTime / workouts.length).toFixed(0);
  const avgTime = formatWorkoutDuration(avgSeconds);
  return avgTime;
}

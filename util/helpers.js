import { Keyboard, TouchableWithoutFeedback } from "react-native";

// Hide that keyboard!
export const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

//Sort workouts
export function sortWorkouts(workouts, direction) {
  if(workouts.length === 0) {
    return
  };
  if (direction === 'recent') {
    workouts.sort((a, b) => b.createdAt - a.createdAt );
  } else {
    workouts.sort((a, b) => a.createdAt - b.createdAt );
  }
  return workouts
}

//FORMAT WORKOUT DURATION
export function formatWorkoutDuration(time) {
  const minutes = (time/60).toFixed();
  const displayedSeconds = time%60
  const formattedMinutes = (minutes<10 ? `0${minutes}` : minutes)
  const formattedSeconds = (displayedSeconds <10 ? `0${displayedSeconds}` : displayedSeconds)
  const formattedTime = `${formattedMinutes}:${formattedSeconds}`
  return formattedTime
};
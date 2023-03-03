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
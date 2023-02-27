import { Keyboard, TouchableWithoutFeedback } from "react-native";

// Hide that keyboard!
export const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
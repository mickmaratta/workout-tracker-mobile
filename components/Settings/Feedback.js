import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Feedback = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        If you have any feedback or feature requests please contact me
      </Text>
      <Text style={[styles.text, styles.textBold]}>carlos@carlos.com</Text>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    shadowColor: Colors.secondary300,
    shadowRadius: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 8,
  },
  textBold: {
    fontWeight: "bold",
  }
});

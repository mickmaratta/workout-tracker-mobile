import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

const SmallWidget = ({ value, desc, mode }) => {
  return (
    <View style={[styles.container, mode==='dark' ? styles.darkContainer : styles.lightContainer]}>
      <Ionicons
        name="barbell"
        size={30}
        color={Colors.secondary300}
        style={styles.icon}
      />
      <Text style={[styles.text, styles.valueText]}>{value}</Text>
      <Text style={[styles.text, styles.descText]}>{desc}</Text>
    </View>
  );
};

export default SmallWidget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    margin: 5,
    borderRadius: 20,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    justifyContent: "center",
  },
  darkContainer: {
    backgroundColor: Colors.primary500
  },
  lightContainer:{
    backgroundColor: 'white'
  },
  icon: {
    top: 5,
    left: 5,
    position: "absolute",
  },
  text: {
    color: Colors.secondary300,
    textAlign: "center",
  },
  valueText: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
  descText: {
    fontStyle: "italic",
  }
});

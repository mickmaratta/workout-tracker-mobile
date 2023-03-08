import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/GlobalStyles";

const SmallWidget = () => {
  return (
    <View style={styles.container}>
      <Text>Small</Text>
    </View>
  );
};

export default SmallWidget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    margin: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary500,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
});

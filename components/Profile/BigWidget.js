import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/GlobalStyles";

const BigWidget = () => {
  return (
    <View style={styles.bigWidget}>
      <Text>Big widget</Text>
    </View>
  );
};

export default BigWidget;

const styles = StyleSheet.create({
  bigWidget: {
    backgroundColor: Colors.secondary300,
    height: 150,
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: Colors.secondary300,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
});

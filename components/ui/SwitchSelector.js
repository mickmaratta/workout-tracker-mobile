import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/GlobalStyles";

const SwitchSelector = ({ left, right, onPress }) => {
  const [leftPressed, setLeftPressed] = useState(true);

  function handleSwitch(left) {
    if (left) {
        setLeftPressed(true);
        onPress(true);
    } else {
        setLeftPressed(false)
        onPress(false);
    }
  }
  return (
    <View style={styles.container}>
        <Pressable style={[styles.buttonLeft, leftPressed && styles.pressed]} onPress={() => {handleSwitch(left)}} >
          <Text style={styles.text}>{left}</Text>
        </Pressable>
      <Pressable style={[styles.buttonRight, !leftPressed && styles.pressed]} onPress={() => {handleSwitch()}}>
        <Text style={styles.text}>{right}</Text>
      </Pressable>
    </View>
  );
};

export default SwitchSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
  },
  buttonLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  buttonRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 14,
    padding: 2
  },
  pressed: {
    backgroundColor: Colors.primary500,
  },
});

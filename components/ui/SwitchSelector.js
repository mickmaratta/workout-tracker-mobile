import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/GlobalStyles";

const SwitchSelector = ({ left, right }) => {
  const [leftPressed, setLeftPressed] = useState(true);

  function handleSwitch(left) {
    if (left) {
        setLeftPressed(true)
    } else {
        setLeftPressed(false)
    }
  }
  return (
    <View style={styles.container}>
        <Pressable style={[styles.buttonLeft, leftPressed && styles.pressed]} onPress={() => {handleSwitch(left)}} >
          <Text>{left}</Text>
        </Pressable>
      <Pressable style={[styles.buttonRight, !leftPressed && styles.pressed]} onPress={() => {handleSwitch()}}>
        <Text>{right}</Text>
      </Pressable>
    </View>
  );
};

export default SwitchSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
    borderRadius: 20,
  },
  innerContainer: {
    backgroundColor: 'transparent',
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
  pressed: {
    backgroundColor: Colors.primary500,
  },
});

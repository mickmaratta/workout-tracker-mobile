import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SettingListItem from "./SettingListItem";
import { Colors } from "../../constants/GlobalStyles";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Feedback from "./Feedback";

const SettingsList = () => {
  const [toggleFeedback, setToggleFeedback] = useState(false);

  function handleToggleFeedback() {setToggleFeedback(!toggleFeedback)};

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <SettingListItem itemText="Edit Profile" icon="person-circle-outline" />
      <SettingListItem itemText="Feedback" icon="mail-open-outline" onPress={handleToggleFeedback} />
      {toggleFeedback && <Feedback />}
      <SettingListItem itemText="Terms & Conditions" icon="newspaper-outline" />
      <SettingListItem
        itemText="Log-Out"
        icon="log-out-outline"
        onPress={() => signOut(auth)}
      />
    </View>
  );
};

export default SettingsList;

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.neutralGray300,
  },
  title: {
    fontSize: 32,
    color: Colors.neutral100,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
  },
});

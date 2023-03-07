import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Header from "../components/ui/Header";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../constants/GlobalStyles";
import BigWidget from "../components/Profile/BigWidget";
import SmallWidget from "../components/Profile/SmallWidget";

const ProfileScreen = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <View>
      <Header>Profile</Header>
      <View style={styles.container}>
        <Text style={styles.title}>{currentUser.displayName}</Text>
        <View style={styles.widgetContainer}>

        <BigWidget />
        <View style={styles.smWidgetContainer}>
          <SmallWidget />
          <SmallWidget />
        </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 30,
  },
  widgetContainer: {
    marginTop: 15
  },
  smWidgetContainer: {
    flexDirection: "row"
  }
 
});

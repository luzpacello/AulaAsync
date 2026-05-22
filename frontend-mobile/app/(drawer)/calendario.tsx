import { Ionicons } from "@expo/vector-icons";
import { Color, Link, router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

export default function CalendarioScreen() {


  return (
    <View style={styles.container}>
      <Text>...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  card: {
    width: "85%",
    padding: 50,
    borderRadius: 25,
    backgroundColor: "rgba(142, 202, 230, 0.1)",
  },

  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    color: "white",
    fontWeight: 500,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#023047",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
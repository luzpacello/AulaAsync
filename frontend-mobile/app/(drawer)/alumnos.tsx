import { Ionicons } from "@expo/vector-icons";
import { Color, Link, router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

export default function AlumnosScreen() {

    const navToDash = () => {
        router.replace('/drawer');
    }

    const [colegio, setColegio] = useState<number | null>(null);
    
    const colegios = [
      { value: 1, label: "Colegio A" },
      { value: 2, label: "Colegio B" },
    ];

  return (
    <View style={styles.container}>
      <Text>Hola mundo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
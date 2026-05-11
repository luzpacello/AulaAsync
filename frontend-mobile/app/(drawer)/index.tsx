import { Ionicons } from "@expo/vector-icons";
import { Color, Link, router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.atajos}>
        <TouchableOpacity style={styles.atajo}>
          <Text style={styles.atajoText}>Atajo 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.atajo}>
          <Text style={styles.atajoText}>Atajo 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.atajo}>
          <Text style={styles.atajoText}>Atajo 1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.titulo}>CLASES DEL DIA</Text>
        <Text style={styles.item}>Clases del día</Text>
        <Text style={styles.item}>Clases del día</Text>
        <Text style={styles.item}>Clases del día</Text>
        <Text style={styles.item}>Clases del día</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.titulo}>EVENTOS DEL DIA</Text>
        <Text style={styles.item}>Clases del día</Text>
        <Text style={styles.item}>Clases del día</Text>
        <Text style={styles.item}>Clases del día</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: "hsl(0, 0%, 10%)"
  },

  atajos: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    borderRadius: 25,
  },

  atajo: {
    width: "30%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "hsla(220, 50%, 25%, 1.00)",
  },

  atajoText: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },

  card: {
    marginTop: 30,
    width: "90%",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "hsla(220, 50%, 25%, 1.00)",
  },

  titulo: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },

  item: {
    fontSize: 22,
    color: "#fff",
  },
});
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CANVAS_HEIGHT = 3000;

function DotLayer({ color, spacing, size, offset = 0 }) {
  const dots = [];

  for (let y = 0; y < CANVAS_HEIGHT; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      dots.push(
        <View
          key={`${x}-${y}-${color}`}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            left: x + offset,
            top: y + offset,
          }}
        />
      );
    }
  }

  return <View style={StyleSheet.absoluteFill}>{dots}</View>;
}

export default function BackgroundGrid({ children }) {
  return (
    <View style={styles.container}>
      {/* Puntos violetas */}
      <DotLayer
        color="rgba(139,92,246,0.7)"
        spacing={20}
        size={2}
      />

      {/* Puntos azules */}
      <DotLayer
        color="rgba(59,130,246,0.5)"
        spacing={40}
        size={2}
        offset={10}
      />

      {/* Puntos rosas */}
      <DotLayer
        color="rgba(236,72,153,0.5)"
        spacing={60}
        size={2}
        offset={30}
      />

      {/* Contenido */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a", },
  content: { flex: 1, zIndex: 10, },
});
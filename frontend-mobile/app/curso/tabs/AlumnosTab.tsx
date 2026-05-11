import { View, Text, TouchableOpacity } from "react-native";

export default function AlumnosTab() {
  const alumnos = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "Ana Gómez" },
  ];

  return (
    <View>
      {alumnos.map((a) => (
        <TouchableOpacity
          key={a.id}
          style={{
            padding: 12,
            borderBottomWidth: 1,
          }}
        >
          <Text>{a.nombre}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
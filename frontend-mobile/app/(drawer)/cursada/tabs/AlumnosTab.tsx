import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AlumnosTab() {
  const alumnos = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "Ana Gómez" },
  ];

  return (
    <View>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{ fontSize:20 }}>Listado de alumnos</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name={"content-save"} size={30} color="#6200ee" style={{ marginHorizontal: 20 }}/>
        </TouchableOpacity>
        
      </View>
      
      {alumnos.map((a) => (
        <TouchableOpacity
          key={a.id}
          style={{
            padding: 12,
          }}
        >
          <Text >{a.nombre}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import AlumnosTab from "./tabs/AlumnosTab";
import AsistenciaTab from "./tabs/AsistenciaTab";
import EvaluacionesTab from "./tabs/EvaluacionesTab";
import TPsTab from "./tabs/TPsTab";

import Clases from "./tabs/ClasesTab";


export default function CursoScreen() {
  const { id } = useLocalSearchParams();

  const [modo, setModo] = useState<"clases" | "organizar">("clases");
  const [tabActiva, setTabActiva] = useState("alumnos");

  const tabsPorModo = {
    clases: [
      { id: "alumnos", label: "👥 Alumnos" },
      { id: "asistencia", label: "📅 Asistencia" },
      { id: "tps", label: "Tps" },
      { id: "evaluaciones", label: "📝 Evaluaciones" },
    ],
    organizar: [
      { id: "Calificaciones", label: "📚 Calificaciones" },
      { id: "tps", label: "📝 tps" },
      { id: "Clases", label: "📚 Clases" },
      { id: "evaluaciones", label: "📝 evaluaciones" },
    ],
  };

  const tabs = tabsPorModo[modo];

  const cambiarModo = (nuevoModo: "clases" | "organizar") => {
    setModo(nuevoModo);
    setTabActiva(tabsPorModo[nuevoModo][0].id);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: `Curso ${id}`,
          headerShown: true,
        }}
      />
      {/* HEADER */}
      <View style={{padding: 16 , flexDirection: "row", justifyContent:"space-between"}}>
        {/*<Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Curso {id}
        </Text>*/}

        {/* acciones */}
        <View style={{width:"100%", flexDirection: "row", justifyContent:"space-around"}}>
          <TouchableOpacity
            onPress={() => cambiarModo("clases")}
            style={{ marginLeft: 10 }}
          >
            <Text style={{ fontWeight: modo === "clases" ? "bold" : "normal", fontSize: 20 }}>
              Modo clases
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => cambiarModo("organizar")}
            style={{ marginLeft: 10 }}
          >
            <Text style={{ fontWeight: modo === "organizar" ? "bold" : "normal" , fontSize: 20 }}>
              Modo organizar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TABS */}
      <View style={{flexDirection:"row", gap:1, justifyContent:"space-around"}}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t.id}
            onPress={() => setTabActiva(t.id)}
            style={{
              borderBottomWidth: tabActiva === t.id ? 2 : 0,
            }}
          >
            <Text style={{fontSize:16}}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
        

      {/* CONTENIDO */}
      <View style={{ flex: 1, padding: 16 }}>
        {tabActiva === "alumnos" && <AlumnosTab />}
        {tabActiva === "asistencia" && <AsistenciaTab />}
        {tabActiva === "tps" && <TPsTab />}
        {tabActiva === "evaluaciones" && <EvaluacionesTab />}

        {tabActiva === "Calificaciones" && <Text>Calificaciones</Text>}
        {tabActiva === "tps" && <Text>tps</Text>}
        {tabActiva === "Clases" && <Text>Clases</Text>}
        {tabActiva === "evaluaciones" && <Text>evaluaciones</Text>}
      </View>
    </View>
  );
}
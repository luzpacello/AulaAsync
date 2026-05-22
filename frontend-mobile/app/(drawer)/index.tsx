import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Clase, Evento as ModelEvento } from "@/src/types/schema";
import { obtenerClases } from "@/src/services/clases.service";
import { obtenerEventos } from "@/src/services/eventos.service";
import { useEffect, useState } from "react";
import { ShortcutTile } from "../../src/components/ShortcutTile";

export default function HomeScreen() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [eventos, setEventos] = useState<ModelEvento[]>([]);

  // datos provisorios
  const userName = "Luz";
  const userShortcuts = [
    { id: 1, label: 'Pasar Lista', icon: 'account-check', route: '/', color: '#4CAF50' },
    { id: 2, label: 'Materias', icon: 'book-open-variant', route: '/materias', color: '#2196F3' },
    { id: 3, label: 'Calendario', icon: 'calendar-month', route: '/calendario', color: '#FF9800' },
  ];

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
     try {
      const [clasesData, eventosData] = await Promise.all([
        obtenerClases(),
        obtenerEventos(),
      ]);
      setClases(clasesData);
      setEventos(eventosData);
     } catch (error) {
      console.log(error);
     }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textoSup}> Bienvenida <Text style={{color:"#FFB703"}}>{userName}</Text></Text>
      <View style={styles.atajos}>
        {userShortcuts.map((item) => (
              <ShortcutTile 
                key={item.id} 
                label={item.label} 
                icon={item.icon as any} 
                route={item.route} 
                color={item.color}
              />
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.titulo}>CLASES DEL DIA</Text>
        {clases.map((clase) => (
          <View key={clase.id} style={styles.subItemContainer}>
            <Ionicons name="book-outline" size={18} color="#2196F3" style={{ marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTextoPrincipal}>{clase.tema || "Sin tema asignado"}</Text>
              <Text style={styles.itemTextoSecundario}>{clase.actividades}</Text>
            </View>
            <Text style={styles.badgeEstado}>{clase.estado}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.titulo}>EVENTOS DEL DIA</Text>
        {eventos.map((evento) => (
          <View key={evento.id} style={styles.subItemContainer}>
            <Ionicons name="calendar-outline" size={18} color="#fb8500" style={{ marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTextoPrincipal}>{evento.titulo}</Text>
              <Text style={styles.itemTextoSecundario}>Tipo: {evento.tipo}</Text>
            </View>
          </View>
        ))}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, backgroundColor: "#fff", },
  textoSup: { fontSize: 30, marginBottom: 10, marginLeft: 10, fontWeight: "bold", color: "#023047", },
  atajos: { width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", padding: 5, },
  atajo: { width: "30%", borderRadius: 10, overflow: "hidden", },
  atajobtn: { padding: 15, justifyContent: "center", alignItems: "center", },
  atajoText: { fontSize: 30, textAlign: "center", fontWeight: "bold", color: "#fff", },
  card: { marginTop: 30, width: "95%", alignSelf: "center", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 25, backgroundColor: "#dbdbe5", },
  titulo: { fontSize: 25, marginBottom: 10, textAlign: "center", fontWeight: "bold", },
  item: { fontSize: 22, },
  subItemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: 12, borderRadius: 12, marginBottom: 10, },
  itemTextoPrincipal: { fontSize: 15, fontWeight: 'bold', color: '#023047', },
  itemTextoSecundario: { fontSize: 13, color: '#555', marginTop: 2, },
  badgeEstado: { fontSize: 11, fontWeight: 'bold', color: '#fff', backgroundColor: '#023047', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, overflow: 'hidden', }
});
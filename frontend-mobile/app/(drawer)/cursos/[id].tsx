import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { authFetch } from "@/src/services/api";

export default function CursoDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [curso, setCurso] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function cargarCurso() {
    try {
      const response = await authFetch(`/cursos/${id}`);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Error obteniendo curso");
      }

      setCurso(json);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      cargarCurso();
    }, [id])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#023047" />
      </View>
    );
  }

  if (!curso) {
    return (
      <View style={styles.center}>
        <Text>No se pudo cargar el curso.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {curso.anio}° {curso.division}
        </Text>

        <Text style={styles.subtitle}>{curso.orientacion}</Text>

        <Text style={styles.subtitle2}>{curso.ciclo}</Text>
      </View>

      <TouchableOpacity
        style={styles.importar}
        onPress={() =>
          router.push({
            pathname: "/scanner",
            params: {
              cursoId: curso.id.toString(),
            },
          })
        }
      >
        <MaterialCommunityIcons
          name="qrcode-scan"
          color="white"
          size={24}
        />

        <Text style={styles.importarText}>
          Importar alumnos desde QR
        </Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Alumnos ({curso.alumnos.length})
        </Text>

        {curso.alumnos.length === 0 ? (
          <Text style={styles.empty}>
            No hay alumnos cargados.
          </Text>
        ) : (
          <FlatList
            data={curso.alumnos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.nombre}>
                  {item.apellido}, {item.nombre}
                </Text>

                <Text>DNI {item.documento}</Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Materias ({curso.cursadas.length})
        </Text>

        {curso.cursadas.length === 0 ? (
          <>
            <Text style={styles.empty}>
              No hay materias asignadas.
            </Text>

          </>
        ) : (
          <FlatList
            data={curso.cursadas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.nombre}>
                  {item.materia.nombre}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#023047",
    padding: 25,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "white",
    fontSize: 18,
    marginTop: 5,
  },

  subtitle2: {
    color: "#ddd",
    marginTop: 5,
  },

  importar: {
    backgroundColor: "#219EBC",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  importarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },

  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#023047",
  },

  empty: {
    color: "#666",
    textAlign: "center",
    marginVertical: 15,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },

  nombre: {
    fontWeight: "bold",
    fontSize: 16,
  },

  botonAgregar: {
    backgroundColor: "#023047",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },

  botonAgregarTexto: {
    color: "white",
    fontWeight: "bold",
  },
});
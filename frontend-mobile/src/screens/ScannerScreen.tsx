import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { authFetch } from "../services/api";

interface AlumnoQR {
  nombre: string;
  apellido: string;
  documento: string;
}

export default function ScannerScreen() {
  const { cursoId } = useLocalSearchParams<{ cursoId: string }>();

  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Se necesita permiso para utilizar la cámara.
        </Text>

        <Button
          title="Conceder permiso"
          onPress={requestPermission}
        />
      </View>
    );
  }

  async function importar(data: string) {
  try {
    setLoading(true);

    const alumnos: AlumnoQR[] = JSON.parse(data);

    console.log("JSON parseado:");
    console.log(alumnos);

    console.log("Curso:", cursoId);

    const response = await authFetch(
        `/alumnos/curso/${cursoId}/importar`,
        {
            method: "POST",
            body: JSON.stringify({ alumnos }),
        }
    );

    // Leemos la respuesta como texto primero
    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("RESPUESTA:");
    console.log(text);

    // Si hubo error mostramos exactamente lo que respondió el servidor
    if (!response.ok) {
      Alert.alert("Error del servidor", text);
      setScanned(false);
      return;
    }

    // Convertimos recién ahora a JSON
    const json = JSON.parse(text);

    Alert.alert(
      "Éxito",
      `${json.importados ?? alumnos.length} alumnos importados`,
      [
        {
          text: "Aceptar",
          onPress: () => router.back(),
        },
      ]
    );

  } catch (error: any) {
    console.log(error);

    Alert.alert(
      "Error",
      error.message
    );

    setScanned(false);
  } finally {
    setLoading(false);
  }
}

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "ean8", "code128", "pdf417"],
        }}
        onBarcodeScanned={({ data }) => {
            console.log("QR detectado");

            if (scanned || loading) return;

            setScanned(true);

            console.log(data);

            importar(data);
        }}
        //onBarcodeScanned={({ data }) => {
        //  if (scanned || loading) return;

          //setScanned(true);

          //importar(data);
        //}}
      />

      <View style={styles.overlay}>
        <View style={styles.square} />

        <Text style={styles.instructions}>
          Escaneá el código QR con la lista de alumnos
        </Text>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 20 }}
          />
        )}

        {scanned && !loading && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>
              Escanear nuevamente
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#444" }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>
            Cancelar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  square: {
    width: 260,
    height: 260,
    borderWidth: 4,
    borderColor: "#00FF99",
    borderRadius: 16,
    backgroundColor: "transparent",
  },

  instructions: {
    marginTop: 30,
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 20,
  },

  button: {
    marginTop: 25,
    backgroundColor: "#023047",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
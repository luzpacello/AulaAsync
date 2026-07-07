import { Color, Link, router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState, useEffect } from "react";
import BackgroundGrid from "../src/components/BackgroundGrid";
import { getColegiosDropdown } from "../src/services/colegio";
import { login } from "../src/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width, height } = Dimensions.get('window');

export default function LoginScreen() {

    const handleLogin = async () => {
      try {
        if (!colegioSeleccionado) {
          alert("Seleccione un colegio");
          return;
        }

        console.log("Colegio:", colegioSeleccionado);
        console.log("Password:", password);
        const resultado = await login(
          Number(colegioSeleccionado),
          password
        );

        await AsyncStorage.setItem("token", resultado.token);
        await AsyncStorage.setItem(
          "colegioId",
          resultado.colegio.id.toString()
        );
        router.replace("/(drawer)");

      } catch (error) {
        alert("Perfil o contraseña incorrectos");
        console.error(error);
      }
    };

    const [listaColegios, setListaColegios] = useState([]);
    const [colegioSeleccionado, setColegioSeleccionado] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [password, setPassword] = useState("");

    // Cargar dropdown al iniciar
    useEffect(() => {
      getColegiosDropdown()
        .then((data) => {
          setListaColegios(data);
          setLoadingData(false);
        });
    }, []);

  return (
    <BackgroundGrid>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Dropdown 
            style={styles.input}
            data={listaColegios}
            labelField="label"
            valueField="value"
            placeholder="Elegir curso..."
            placeholderStyle={{color:"white"}}
            selectedTextStyle={{color:"white", fontWeight: 500}}
            containerStyle={{borderBottomEndRadius: 25, borderBottomStartRadius: 25, borderTopStartRadius:5, borderTopEndRadius: 5 ,backgroundColor: "rgba(2, 48, 71, 1)"}}
            itemTextStyle={{color: "white"}}
            activeColor="rgba(2, 48, 71, 0.75)"
            value={colegioSeleccionado}
            onChange={(item) => setColegioSeleccionado(item.value)}
          />
          <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#ccc"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundGrid>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  card: { width: "85%", padding: 50, borderRadius: 25, backgroundColor: "hsla(0, 0%, 20%, 0.50)", },
  title: { fontSize: 30, color: "white", textAlign: "center", marginBottom: 20, },
  input: { borderWidth: 1, backgroundColor: "rgba(2, 48, 71, 0.5)", borderColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 10, padding: 15, color: "white", fontWeight: 600, marginBottom: 10, },
  button: { backgroundColor: "#023047", padding: 12, borderRadius: 10, marginTop: 10, },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold", },
});
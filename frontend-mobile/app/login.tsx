import { Color, Link, router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import BackgroundGrid from "./components/BackgroundGrid";

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {

    const navToDash = () => {
        router.replace('/(drawer)');
    }

    const [colegio, setColegio] = useState<number | null>(null);
    
    const colegios = [
      { value: 1, label: "Colegio A" },
      { value: 2, label: "Colegio B" },
    ];

  return (
    <BackgroundGrid>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <Dropdown 
            style={styles.input}
            data={colegios}
            labelField="label"
            valueField="value"
            placeholder="Elegir curso..."
            placeholderStyle={{color:"white"}}
            selectedTextStyle={{color:"white", fontWeight: 500}}
            containerStyle={{borderRadius:25}}
            value={colegio}
            onChange={(item) => setColegio(item.value)}
          />
          <TextInput placeholder="Contraseña"
              placeholderTextColor="#ccc"
              style={styles.input}></TextInput>
          <TouchableOpacity style={styles.button} onPress={navToDash}>
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundGrid>
    
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
  },

  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    backgroundColor: "rgba(2, 48, 71, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    color: "white",
    fontWeight: 600,
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

/* <div className="min-h-screen w-full bg-[#0f172a] relative">
  {/* Dark Dotted Grid Background 
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#0f172a",
      backgroundImage: `
        radial-gradient(circle, rgba(139,92,246,0.6) 1px, transparent 1px),
        radial-gradient(circle, rgba(59,130,246,0.4) 1px, transparent 1px),
        radial-gradient(circle, rgba(236,72,153,0.5) 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px, 40px 40px, 60px 60px",
      backgroundPosition: "0 0, 10px 10px, 30px 30px",
    }}
  />
     
</div>*/
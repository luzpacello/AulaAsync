import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

function HeaderLeft() {
  const navigation = useNavigation();

  const navToLogin = () => {
          router.replace('/login');
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ marginHorizontal: 15 }}
    >
      <Ionicons name="menu-outline" size={24} color={"white"}/>
    </TouchableOpacity>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerInactiveTintColor: "#fff",
        drawerStyle: {
          backgroundColor:"#252525"
        },
        headerShown: true,

        headerStyle: {
          backgroundColor: "#252525",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "left",
        // Botón hamburguesa
        headerLeft: () => <HeaderLeft />,
      }}
    >
      {/* 🏠 Inicio */}
      <Drawer.Screen
        name="index"
        options={{
          title: "Nombre Colegio",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 📚 Materias */}
      <Drawer.Screen
        name="materias"
        options={{
          title: "MATERIAS",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 🏫 Cursos */}
      <Drawer.Screen
        name="cursos"
        options={{
          title: "Cursos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 👥 Alumnos */}
      <Drawer.Screen
        name="alumnos"
        options={{
          title: "Alumnos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

        { /* Ajustes */}
        <Drawer.Screen
        name="ajustes"
        options={{
          title: "Ajustes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cog-outline" size={size} color={color} />
          ),
        }}
      />
      { /* rutas desactivadas 
      <Drawer.Screen
        name="ruta-que-no-queres"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />*/}
    </Drawer>
  );
}
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { router } from "expo-router";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function HeaderLeft() {
  const navigation = useNavigation();

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
  const nombreColegio = "CTPOBA";

  const handleLougout = () => {
      console.log("Sesión cerrada");
      router.replace('/login');
    }

  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} onLogout={handleLougout} />
      )}
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
        headerLeft: () => <HeaderLeft />,
      }}
    >
      {/* home */}
      <Drawer.Screen
        name="index"
        options={{
          title: nombreColegio,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Materias */}
      <Drawer.Screen
        name="materias"
        options={{
          title: "Materias",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Cursos */}
      <Drawer.Screen
        name="cursos"
        options={{
          title: "Cursos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Alumnos */}
      <Drawer.Screen
        name="alumnos"
        options={{
          title: "Alumnos",
          drawerItemStyle: {display:"none"}
        }}
      />

        { /* Cursada */}
        <Drawer.Screen
        name="cursada/[id]"
        options={{
          title: "Detalle de Cursada",
          drawerItemStyle: {display:"none"}
        }}
      />

      { /* Calendario */}
        <Drawer.Screen
        name="calendario"
        options={{
          title: "Calendario",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen 
        name="ajustes"
        options={{
          title: "Ajustes",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      {[
        "AlumnosTab", "AsistenciaTab", "CalificacionesTab", "ClasesTab", 
        "CrearEvaluacionTab", "EntregasTab", "EvaluacionesTab", "NotasTab", "TPsTab"
      ].map((tabName) => (
        <Drawer.Screen
          key={tabName}
          name={`cursada/tabs/${tabName}`}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
      ))}
      
    </Drawer>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={props.onLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color={'white'} style={{ marginRight: 10 }} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#1a1a1a",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
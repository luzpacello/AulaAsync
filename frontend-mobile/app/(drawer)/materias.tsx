import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

export default function MateriasScreen() {
  const [abierta, setAbierta] = useState<number | null>(null);

  const [curso, setCurso] = useState<number | null>(null);

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const materias = [
    {
      id: 1,
      nombre: "Matemática",
      cursos: [
        { id: 1, nombre: "1°A" },
        { id: 2, nombre: "2°B" },
      ],
    },
    {
      id: 2,
      nombre: "Lengua",
      cursos: [{ id: 3, nombre: "3°A" }],
    },
  ];

  const cursosDisp = [
    { value: 1, label: "1°A" },
    { value: 2, label: "2°B" },
    { value: 3, label: "3°A" }
  ];

    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const [horarios, setHorarios] = useState([
    { dia: "", desde: "", hasta: "" }
    ]);

    const agregarHorario = () => {
        setHorarios([...horarios, { dia: "", desde: "", hasta: "" }]);
    };

    const eliminarHorario = (index) => {
        setHorarios(horarios.filter((_, i) => i !== index));
    };

    const actualizarHorario = (index, campo, valor) => {
        const nuevos = [...horarios];

        nuevos[index][campo] = valor;

        setHorarios(nuevos);
    };
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.button} >
            <Ionicons name="add" size={30}  />
            <Text style={styles.buttonText}>AGREGAR MATERIA</Text>
        </TouchableOpacity>
        <Modal visible={visible} transparent={true} animationType="slide" >
            <View style={styles.modalView}>
                <View style={styles.card} >
                    <Text style={styles.label}>Nombre de la materia</Text>
                    <TextInput placeholder="MATEMATICAS" 
                        placeholderTextColor="#ccc"
                        style={styles.input}
                    ></TextInput>
                    <View style={styles.lineaBoton}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.buttonAcccion}>
                        <Text style={styles.buttonText}>CERRAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAcccion}>
                            <Text style={styles.buttonText}>GUARDAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        {materias.map((materia) => {
            const isOpen = abierta === materia.id;

            return (
                <View key={materia.id} style={styles.itemMateria} >
                    {/* HEADER */}
                    <TouchableOpacity
                        onPress={() =>
                            setAbierta(isOpen ? null : materia.id)
                        }
                        style={styles.headerItem}
                    >
                        <Ionicons
                            name={isOpen ? "caret-down" : "caret-forward"}
                            size={18}
                            style={{ marginRight: 8}}
                        />
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            {materia.nombre}
                        </Text>
                    </TouchableOpacity>

                    {/* CONTENIDO */}
                    {isOpen && (
                    <View style={{ padding: 12}}>
                        {materia.cursos.map((curso) => (
                        <TouchableOpacity
                            key={curso.id}
                            onPress={() => router.push(`/curso/${curso.id}`)}
                            style={styles.listItem}
                        >
                            <Ionicons name="ellipse" size={10} />
                            <Text style={styles.item}>
                                {curso.nombre}
                            </Text>
                        </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setVisible1(true)} style={styles.button2} >
                            <Text style={styles.buttonText}>
                                AGREGAR CURSO
                            </Text>
                        </TouchableOpacity>
                        <Modal visible={visible1} transparent animationType="slide">
                        <View
                            style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "center",
                            }}
                        >
                            <View
                            style={{
                                margin: 20,
                                backgroundColor: "white",
                                padding: 20,
                                borderRadius: 10,
                                maxHeight: "80%",
                            }}
                            >
                            <ScrollView>
                                
                                {/* TÍTULO */}
                                <Text style={ styles.titulo }>
                                Crear cursada
                                </Text>

                                {/* CURSO */}
                                <Text style={styles.label}>Curso</Text>
                                <Dropdown
                                data={cursosDisp}
                                labelField="label"
                                valueField="value"
                                placeholder="Seleccionar curso"
                                value={cursoSeleccionado}
                                onChange={(item) => setCursoSeleccionado(item.value)}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 12,
                                }}
                                />

                                {/* HORARIOS */}
                                {horarios.map((h, index) => (
                                <View
                                    key={index}
                                    style={{
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 10,
                                    }}
                                >
                                    <Text style={styles.label}>Día</Text>
                                    <TextInput
                                    placeholder="Lunes"
                                    value={h.dia}
                                    onChangeText={(text) =>
                                        actualizarHorario(index, "dia", text)
                                    }
                                    style={ styles.inputText }
                                    />

                                    <Text style={styles.label}>Desde</Text>
                                    <TextInput
                                    placeholder="08:00"
                                    value={h.desde}
                                    onChangeText={(text) =>
                                        actualizarHorario(index, "desde", text)
                                    }
                                    style={ styles.inputText }
                                    />

                                    <Text style={styles.label}>Hasta</Text>
                                    <TextInput
                                    placeholder="10:00"
                                    value={h.hasta}
                                    onChangeText={(text) =>
                                        actualizarHorario(index, "hasta", text)
                                    }
                                    style={ styles.inputText }
                                    />

                                    <TouchableOpacity onPress={() => eliminarHorario(index)}>
                                    <Text style={ styles.text }>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                                ))}

                                {/* AGREGAR */}
                                <TouchableOpacity onPress={agregarHorario}>
                                <Text style={ styles.text }>
                                    + Agregar día
                                </Text>
                                </TouchableOpacity>

                                {/* BOTONES */}
                                <View style={styles.lineaBoton}>
                                    <TouchableOpacity
                                    onPress={() => {
                                        console.log({
                                        cursoSeleccionado,
                                        horarios,
                                        });
                                        setVisible(false);
                                    }}
                                    style={styles.buttonAcccion}
                                    >
                                        <Text style={styles.buttonText}>
                                            Guardar
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setVisible1(false)} style={styles.buttonAcccion}>
                                        <Text style={styles.buttonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                                

                            </ScrollView>
                            </View>
                        </View>
                        </Modal>
                    </View>
                )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },

    lineaBoton: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    buttonAcccion: {
        width: "45%",
        backgroundColor: "#219EBC",
        padding: 12,
        borderRadius: 10,
        marginVertical: 10,
    },

    button: {
        width: "100%",
        backgroundColor: "#219EBC",
        padding: 12,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    button2: {
        width: "100%",
        backgroundColor: "rgba(142, 202, 230, 0.5)",
        padding: 8,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        color: "#023047",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },

    label: {
        fontSize: 20,
        marginVertical: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: "#023047",
        borderRadius: 10,
        padding: 15,
        fontWeight: 500,
        marginBottom: 10,
    },

    card: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },

    itemMateria: {
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
    },

    headerItem: {
        padding: 14,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
    },

    item: {
        paddingHorizontal: 4,
        fontSize: 20, 
        fontWeight: 600,
    },

    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4, 
        paddingHorizontal: 15,
    },

    modalView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    titulo: {
      fontSize: 25,
      textAlign: "center",
      fontWeight: "bold",
      color: "#023047",
    },

    inputText: {
        fontSize: 18,
        borderBottomWidth: 1, 
        marginBottom: 4
    },

    text: {
        fontSize: 20,
        padding: 3,
    }
});
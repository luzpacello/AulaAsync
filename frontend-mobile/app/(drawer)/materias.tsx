import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getMaterias, createMateria } from '@/src/services/materia';
import { Dropdown } from "react-native-element-dropdown";
import { getCursos } from "@/src/services/curso";
import { createCursada } from "@/src/services/cursada";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MateriasScreen() {
  const router = useRouter();
  const [materias, setMaterias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalMateriaVisible, setModalMateriaVisible] = useState(false);
  const [modalCursadaVisible, setModalCursadaVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [nuevaMateria, setNuevaMateria] = useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<number | null>(null);

  const [nuevoCurso, setNuevoCurso] = useState('');
  const [horariosTemporales, setHorariosTemporales] = useState<HorarioDetalle[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState('Lunes');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [cursosDisponibles, setCursosDisponibles] = useState<any[]>([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<number | null>(null);

  const cargarMaterias = async () => {
    try {
      setLoading(true);

      const data = await getMaterias();

      setMaterias(data);
    } catch (error) {
      console.error(error);
      alert("No se pudieron cargar las materias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  const agregarMateria = async () => {
    try {
      if (!nuevaMateria.trim()) {
        alert("Ingrese un nombre para la materia");
        return;
      }

      await createMateria(nuevaMateria);

      await cargarMaterias();

      setNuevaMateria("");
      setModalMateriaVisible(false);

    } catch (error) {
      console.error(error);
      alert("No se pudo crear la materia");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#023047" />
      </View>
    );
  }
  
    return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Materias</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setModalMateriaVisible(true)}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#white" />
          <Text style={styles.addButtonText}>Nueva Materia</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={materias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.materiaCard}>
            <TouchableOpacity
              style={styles.materiaHeader}
              onPress={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            >
              <Text style={styles.materiaNombre}>{item.nombre}</Text>

              <MaterialCommunityIcons
                name={expandedId === item.id ? "chevron-up" : "chevron-down"}
                size={24}
              />
            </TouchableOpacity>

            {expandedId === item.id && (
              <View style={styles.cursadasContainer}>

                {item.cursadas.length > 0 ? (
                  item.cursadas.map((c) => (
                    <TouchableOpacity
                      key={c.id}
                      style={styles.cursadaItem}
                      onPress={() =>
                        router.push({
                          pathname: "/cursada/[id]",
                          params: {
                            id: c.id.toString(),
                            nombreMateria: item.nombre,
                            curso: `${c.curso.anio}° ${c.curso.division}`,
                          },
                        })
                      }
                    >
                      <Text style={styles.cursadaText}>
                        {c.curso.anio}° {c.curso.division}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.sinCursadas}>
                    No hay cursadas creadas.
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.addCursadaBtn}
                  onPress={async () => {
                      setMateriaSeleccionada(item.id);

                      const cursos = await getCursos();

                      setCursosDisponibles(
                          cursos.map((c:any)=>({
                              label:`${c.anio}° ${c.division}`,
                              value:c.id
                          }))
                      );

                      setModalCursadaVisible(true);
                  }}
                >
                  <Text style={styles.addCursadaBtnText}>
                    + Agregar Cursada
                  </Text>
                </TouchableOpacity>

              </View>
            )}
          </View>
        )}
      />

      {/* MODAL AGREGAR MATERIA */}
      <Modal visible={modalMateriaVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Materia</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la materia"
              value={nuevaMateria}
              onChangeText={setNuevaMateria}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => {
                setNuevaMateria("");
                setModalCursadaVisible(false);
              }} style={styles.btnCancel}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={agregarMateria} style={styles.btnSave}>
                <Text style={{color: 'white'}}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL AGREGAR CURSADA */}
<Modal
          visible={modalCursadaVisible}
          animationType="slide"
          transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>
                Nueva Cursada
            </Text>

            <Dropdown
                style={styles.input}
                data={cursosDisponibles}
                labelField="label"
                valueField="value"
                placeholder="Seleccionar curso..."
                value={cursoSeleccionado}
                onChange={(item)=>{
                    setCursoSeleccionado(item.value);
                }}
            />

            <View style={styles.separator}/>

            <Text style={styles.subTitle}>
                Horarios
            </Text>

            <View style={styles.row}>

                <TextInput
                    style={[styles.input,{flex:2}]}
                    placeholder="Día"
                    value={diaSeleccionado}
                    onChangeText={setDiaSeleccionado}
                />

                <TextInput
                    style={[styles.input,{flex:1,marginLeft:5}]}
                    placeholder="Inicio"
                    value={horaInicio}
                    onChangeText={setHoraInicio}
                />

                <TextInput
                    style={[styles.input,{flex:1,marginLeft:5}]}
                    placeholder="Fin"
                    value={horaFin}
                    onChangeText={setHoraFin}
                />

            </View>

            <TouchableOpacity
                style={styles.btnAddDetail}
                onPress={()=>{

                    if(!horaInicio || !horaFin)
                        return;

                    setHorariosTemporales([
                        ...horariosTemporales,
                        {
                            dia:diaSeleccionado,
                            inicio:horaInicio,
                            fin:horaFin
                        }
                    ]);

                    setHoraInicio("");
                    setHoraFin("");

                }}
            >

                <Text style={styles.btnAddDetailText}>
                    + Agregar horario
                </Text>

            </TouchableOpacity>

            <ScrollView
                style={{
                    maxHeight:150,
                    marginBottom:20
                }}
            >

                {horariosTemporales.map((h,index)=>(

                    <View
                        key={index}
                        style={styles.tempItem}
                    >

                        <Text>
                            {h.dia} • {h.inicio} - {h.fin}
                        </Text>

                        <TouchableOpacity
                            onPress={()=>{

                                setHorariosTemporales(
                                    horariosTemporales.filter(
                                        (_,i)=>i!==index
                                    )
                                );

                            }}
                        >

                            <MaterialCommunityIcons
                                name="delete"
                                size={20}
                                color="red"
                            />

                        </TouchableOpacity>

                    </View>

                ))}

            </ScrollView>

            <View style={styles.modalButtons}>

                <TouchableOpacity
                    style={styles.btnCancel}
                    onPress={()=>{

                        setModalCursadaVisible(false);
                        setCursoSeleccionado(null);
                        setHorariosTemporales([]);
                        setHoraInicio("");
                        setHoraFin("");

                    }}
                >

                    <Text>Cancelar</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnSave}
                    onPress={async()=>{

                        try{

                            if(!cursoSeleccionado){
                                alert("Seleccione un curso");
                                return;
                            }

                            await createCursada({

                                materiaId:materiaSeleccionada,

                                cursoId:cursoSeleccionado,

                                horarios:horariosTemporales

                            });

                            await cargarMaterias();

                            setModalCursadaVisible(false);

                            setCursoSeleccionado(null);

                            setHorariosTemporales([]);

                            setHoraInicio("");

                            setHoraFin("");

                        }catch(e){

                            console.log(e);

                            alert("No se pudo crear la cursada");

                        }

                    }}
                >

                    <Text
                        style={{
                            color:"white",
                            fontWeight:"bold"
                        }}
                    >
                        Guardar
                    </Text>

                </TouchableOpacity>

            </View>

          </View>
      </View>
  </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: { backgroundColor: '#6200ee', flexDirection: 'row', padding: 10, borderRadius: 10, alignItems: 'center' },
  addButtonText: { color: 'white', marginLeft: 5, fontWeight: '600' },
  materiaCard: { backgroundColor: 'white', borderRadius: 12, marginBottom: 10, overflow: 'hidden', elevation: 2 },
  materiaHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  materiaNombre: { fontSize: 18, fontWeight: '600' },
  cursadasContainer: { padding: 15, backgroundColor: '#fafafa', borderTopWidth: 1, borderTopColor: '#eee' },
  cursadaItem: { padding: 10, backgroundColor: 'white', borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#ddd' },
  cursadaText: { fontWeight: 'bold', color: '#333' },
  horarioText: { fontSize: 12, color: '#666' },
  addCursadaBtn: { marginTop: 10, alignItems: 'center', padding: 8 },
  addCursadaBtnText: { color: '#6200ee', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  btnCancel: { marginRight: 15, padding: 10 },
  btnSave: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8, paddingHorizontal: 20 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  subTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#555' },
  row: { flexDirection: 'row', marginBottom: 10, maxWidth: '80%' },
  btnAddDetail: { alignSelf: 'flex-start', padding: 8, backgroundColor: '#6200ee20', borderRadius: 5, marginBottom: 15 },
  btnAddDetailText: { color: '#6200ee', fontWeight: 'bold', fontSize: 12 },
  tempList: { maxHeight: 120, marginBottom: 15 },
  tempItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f9f9f9', padding: 8, borderRadius: 5, marginBottom: 5 },
  tempItemText: { fontSize: 13, color: '#333' },
  inputSmall: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 8, fontSize: 12 },
  sinCursadas: { color: "#666", fontStyle: "italic",  marginVertical: 10,},
});
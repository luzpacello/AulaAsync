import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Curso } from '@/src/types/schema'; // Importamos tu interfaz real

export default function CursosScreen() {
  const router = useRouter();

  // 1. Mock de datos iniciales basado en tu interfaz Curso
  const [cursos, setCursos] = useState<Curso[]>([
    { id: 101, anio: 4, division: 'A', orientacion: 'Computación', ciclo: 'Superior', colegioId: 10 },
    { id: 102, anio: 5, division: 'B', orientacion: 'Informática', ciclo: 'Superior', colegioId: 10 },
    { id: 103, anio: 1, division: 'C', orientacion: null, ciclo: 'Básico', colegioId: 10 },
  ]);

  // Estados para búsqueda y filtros
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para el Formulario del Nuevo Curso
  const [nuevoAnio, setNuevoAnio] = useState('');
  const [nuevaDivision, setNuevaDivision] = useState('');
  const [nuevoCiclo, setNuevoCiclo] = useState('Superior');
  const [nuevaOrientacion, setNuevaOrientacion] = useState('');

  // 2. Lógica de Filtrado (Buscador)
  const cursosFiltrados = useMemo(() => {
    return cursos.filter(c => 
      `${c.anio} ${c.division} ${c.orientacion || ''}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  }, [busqueda, cursos]);

  const agregarCurso = () => {
    if (nuevoAnio && nuevaDivision) {
      const nuevoObj: Curso = {
        id: Date.now(),
        anio: parseInt(nuevoAnio),
        division: nuevaDivision.toUpperCase(),
        ciclo: nuevoCiclo,
        orientacion: nuevaOrientacion || null,
        colegioId: 10, // Hardcoded por ahora
      };
      setCursos([...cursos, nuevoObj]);
      setModalVisible(false);
      // Limpiar campos
      setNuevoAnio(''); setNuevaDivision(''); setNuevaOrientacion('');
    }
  };

  return (
    <View style={styles.container}>
      
      {/* --- CABECERA Y BUSCADOR --- */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar año o división..."
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#023047" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.title}>Lista de Cursos</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* --- LISTADO DE CURSOS --- */}
      <FlatList
        data={cursosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cursoCard}
            onPress={() => {
              router.push({
                pathname: "/cursos/[id]",
                params: { 
                  id: item.id.toString(), 
                  labelCurso: `${item.anio}° ${item.division} - ${item.orientacion || 'Ciclo Básico'}` 
                }
              });
            }}
          >
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>{item.anio}°</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.cursoNombre}>{item.anio}° {item.division}</Text>
              <Text style={styles.cursoSub}>{item.orientacion || 'Ciclo Básico'} • {item.ciclo}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      />

      {/* --- MODAL AGREGAR CURSO --- */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Curso</Text>
            
            <View style={styles.row}>
              <TextInput 
                style={[styles.input, { flex: 1, marginRight: 5 }]} 
                placeholder="Año (ej: 4)" 
                keyboardType="numeric"
                value={nuevoAnio}
                onChangeText={setNuevoAnio}
              />
              <TextInput 
                style={[styles.input, { flex: 1, marginLeft: 5 }]} 
                placeholder="División (ej: A)" 
                value={nuevaDivision}
                onChangeText={setNuevaDivision}
                autoCapitalize="characters"
              />
            </View>

            <TextInput 
              style={styles.input} 
              placeholder="Ciclo (Básico / Superior)" 
              value={nuevoCiclo}
              onChangeText={setNuevoCiclo}
            />

            <TextInput 
              style={styles.input} 
              placeholder="Orientación (opcional)" 
              value={nuevaOrientacion}
              onChangeText={setNuevaOrientacion}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancel}>
                <Text style={{fontWeight: 'bold'}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={agregarCurso} style={styles.btnSave}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Crear Curso</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    flexDirection: 'row', 
    padding: 15, 
    alignItems: 'center', 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  searchBar: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#f0f0f5', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    alignItems: 'center',
    height: 45
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  filterBtn: { marginLeft: 10, padding: 10 },
  titleSection: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#023047' },
  addBtn: { 
    backgroundColor: '#252525', 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cursoCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginHorizontal: 20, 
    marginBottom: 12, 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3
  },
  iconBox: { 
    width: 50, 
    height: 50, 
    backgroundColor: '#FFB703', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  iconText: { fontSize: 18, fontWeight: 'bold', color: '#023047' },
  infoBox: { flex: 1, marginLeft: 15 },
  cursoNombre: { fontSize: 18, fontWeight: 'bold', color: '#023047' },
  cursoSub: { fontSize: 13, color: '#666', marginTop: 2 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#023047', marginBottom: 20, textAlign: 'center' },
  row: { flexDirection: 'row', marginBottom: 10 },
  input: { backgroundColor: '#f0f0f5', padding: 12, borderRadius: 10, marginBottom: 12, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  btnCancel: { flex: 1, paddingVertical: 12, alignItems: 'center', marginRight: 10, borderRadius: 10, backgroundColor: '#e0e0e0' },
  btnSave: { flex: 1, paddingVertical: 12, alignItems: 'center', marginLeft: 10, borderRadius: 10, backgroundColor: '#023047' }
});
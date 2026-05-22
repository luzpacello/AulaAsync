import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TPS_MOCK = [
  { id: '1', nombre: 'TP 1: Requerimientos', tema: 'UML' },
  { id: '2', nombre: 'TP 2: Arquitectura', tema: 'Patrones' },
];

const ENTREGAS_MOCK = {
  '1': [ { alumnoId: '1', entregado: true }, { alumnoId: '2', entregado: false } ],
  '2': [ { alumnoId: '1', entregado: false }, { alumnoId: '2', entregado: false } ],
};

const ALUMNOS_MOCK = [
  { id: '1', nombre: 'Luz Vlog' },
  { id: '2', nombre: 'Juan Perez' },
  { id: '3', nombre: 'Micaela Garcia' },
  { id: '4', nombre: 'Enzo Ferrari' },
];
export default function TPsTab() {
  const [tpSeleccionado, setTpSeleccionado] = useState(TPS_MOCK[0]);
  const [modalRegistro, setModalRegistro] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header con Selector de TP */}
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Seleccionar Trabajo Práctico:</Text>
        <TouchableOpacity style={styles.pickerSimulado}>
          <Text>{tpSeleccionado.nombre}</Text>
          <MaterialCommunityIcons name="chevron-down" size={20} />
        </TouchableOpacity>
      </View>

      {/* Listado de Alumnos y Estado de Entrega */}
      <FlatList
        data={ALUMNOS_MOCK} // Usas los mismos de Asistencia
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Buscamos si el alumno entregó el TP seleccionado
          const entrega = ENTREGAS_MOCK[tpSeleccionado.id]?.find(e => e.alumnoId === item.id);
          
          return (
            <View style={styles.alumnoRow}>
              <Text style={styles.alumnoNombre}>{item.nombre}</Text>
              <View style={[styles.badge, { backgroundColor: entrega?.entregado ? '#C8E6C9' : '#FFCDD2' }]}>
                <Text style={{ color: entrega?.entregado ? '#2E7D32' : '#C62828', fontSize: 12 }}>
                  {entrega?.entregado ? 'Entregado' : 'Pendiente'}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalRegistro(true)}
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  selectorContainer: { marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  pickerSimulado: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8 
  },
  alumnoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  alumnoNombre: { fontSize: 16 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  fab: { 
    position: 'absolute', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#6200ee', 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5 
  }
});
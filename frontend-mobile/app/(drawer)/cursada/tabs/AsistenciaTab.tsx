import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ALUMNOS_MOCK = [
  { id: '1', nombre: 'Luz Vlog' },
  { id: '2', nombre: 'Juan Perez' },
  { id: '3', nombre: 'Micaela Garcia' },
  { id: '4', nombre: 'Enzo Ferrari' },
];

export default function AsistenciaTab() {
  // Estado: un objeto donde la llave es el ID del alumno y el valor es su estado (true = presente)
  const [asistencia, setAsistencia] = useState<Record<string, boolean>>({});

  const toggleAsistencia = (id: string) => {
    setAsistencia(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const marcarTodos = (estado: boolean) => {
    const nuevoEstado: Record<string, boolean> = {};
    ALUMNOS_MOCK.forEach(al => nuevoEstado[al.id] = estado);
    setAsistencia(nuevoEstado);
  };

  return (
    <View style={styles.container}>
      {/* Botones de Acción Masiva */}
      <View style={styles.headerBtns}>
        <TouchableOpacity 
            style={[styles.btnMasivo, {backgroundColor: '#4CAF50'}]}
            onPress={() => marcarTodos(true)}
        >
          <Text style={styles.btnText}>Todos Presentes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={[styles.btnMasivo, {backgroundColor: '#F44336'}]}
            onPress={() => marcarTodos(false)}
        >
          <Text style={styles.btnText}>Todos Ausentes</Text>
        </TouchableOpacity>
      </View>

      {/* Cuadrícula de Alumnos */}
      <FlatList
        data={ALUMNOS_MOCK}
        numColumns={2} // Aquí hacemos la "cuadrícula"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.cardAlumno, 
              { backgroundColor: asistencia[item.id] ? '#e8f5e9' : '#ffebee',
                borderColor: asistencia[item.id] ? '#4CAF50' : '#F44336' }
            ]}
            onPress={() => toggleAsistencia(item.id)}
          >
            <Text style={styles.nombreAlumno}>{item.nombre}</Text>
            <View style={[styles.statusBadge, {backgroundColor: asistencia[item.id] ? '#4CAF50' : '#F44336'}]}>
              <Text style={styles.statusText}>{asistencia[item.id] ? 'Presente' : 'Ausente'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.btnGuardar}>
        <Text style={styles.btnText}>Guardar Asistencia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  headerBtns: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  btnMasivo: { flex: 0.48, padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  cardAlumno: { 
    flex: 1, 
    margin: 5, 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 2, 
    alignItems: 'center',
    height: 100,
    justifyContent: 'center'
  },
  nombreAlumno: { fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  statusText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  btnGuardar: { backgroundColor: '#6200ee', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 }
});
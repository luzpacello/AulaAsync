// src/screens/DetalleCursoScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alumno } from '../types/schema'; // Tu interfaz real de Prisma

interface DetalleCursoProps {
  cursoId: number;
  labelCurso?: string; // Ej: "4to A - Computación"
}

export default function DetalleCursoScreen({ cursoId, labelCurso }: DetalleCursoProps) {
  const [busqueda, setBusqueda] = useState('');

  // 1. Mock de Alumnos filtrados/asociados por cursoId
  const [alumnos] = useState<Alumno[]>([
    { id: 1, nombre: 'Luz', apellido: 'Fernández', documento: '45123456', cursoId: 101 },
    { id: 2, nombre: 'Esteban', apellido: 'Quito', documento: '44987654', cursoId: 101 },
    { id: 3, nombre: 'Nancy', apellido: 'Gómez', documento: '43555666', cursoId: 102 },
    { id: 4, nombre: 'Carlos', apellido: 'Pérez', documento: '46111222', cursoId: 101 },
  ]);

  // 2. Filtramos los alumnos que pertenecen SÓLO a este curso
  const alumnosDelCurso = useMemo(() => {
    return alumnos.filter(alumno => alumno.cursoId === cursoId);
  }, [cursoId, alumnos]);

  // 3. Aplicamos el buscador sobre los alumnos del curso
  const alumnosFiltrados = useMemo(() => {
    return alumnosDelCurso.filter(alumno => 
      `${alumno.nombre} ${alumno.apellido} ${alumno.documento}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  }, [busqueda, alumnosDelCurso]);

  return (
    <View style={styles.container}>
      {/* Cabecera interna informativa */}
      <View style={styles.headerInfo}>
        <Text style={styles.title}>{labelCurso || `Curso ID: ${cursoId}`}</Text>
        <Text style={styles.subTitle}>Listado de Alumnos ({alumnosFiltrados.length})</Text>
      </View>

      {/* Buscador de Alumnos */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar alumno por nombre o DNI..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Lista de Estudiantes */}
      <FlatList
        data={alumnosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        noInvertedRowStyles
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron alumnos en este curso.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.alumnoCard}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{item.nombre[0]}{item.apellido[0]}</Text>
            </View>
            <View style={styles.alumnoInfo}>
              <Text style={styles.alumnoNombre}>{item.apellido}, {item.nombre}</Text>
              <Text style={styles.alumnoDni}>DNI: {item.documento}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("Ver legajo de", item.id)}>
              <Ionicons name="eye-outline" size={20} color="#023047" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  headerInfo: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#023047' },
  subTitle: { fontSize: 16, color: '#666', marginTop: 4 },
  searchBar: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 12, borderRadius: 12, alignItems: 'center', height: 45, marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15 },
  alumnoCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 10, elevation: 2 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#dbdbe5', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 14, fontWeight: 'bold', color: '#023047' },
  alumnoInfo: { flex: 1, marginLeft: 15 },
  alumnoNombre: { fontSize: 16, fontWeight: 'bold', color: '#023047' },
  alumnoDni: { fontSize: 13, color: '#666', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 30, fontStyle: 'italic' }
});
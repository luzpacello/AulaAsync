import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AlumnoTab from './tabs/AlumnosTab';
import AsistenciaTab from './tabs/AsistenciaTab';
import TPsTab from './tabs/TPsTab';
import EvaluacionTab from './tabs/EvaluacionesTab';

const PlaceholderTab = ({ text }: { text: string }) => (
  <View style={styles.tabContent}><Text>{text}</Text></View>
);

export default function DetalleCursada() {
  const { id, nombreMateria, curso } = useLocalSearchParams();
  
  // Estado para el modo principal
  const [modo, setModo] = useState<'clases' | 'organizacion'>('clases');
  
  // Estado para la pestaña activa
  const [tabActiva, setTabActiva] = useState('alumnos');

  // Definición de pestañas según el modo
  const tabs = modo === 'clases' 
    ? [
        { id: 'alumnos', label: 'Alumnos', icon: 'account-group' },
        { id: 'asistencia', label: 'Asistencia', icon: 'calendar-check' },
        { id: 'tps', label: 'TPs', icon: 'file-document-edit' },
        { id: 'evaluaciones', label: 'Evaluaciones', icon: 'clipboard-text' }
      ]
    : [
        { id: 'alumnos', label: 'Alumnos', icon: 'account-group' },
        { id: 'calificaciones', label: 'Notas', icon: 'chart-bar' },
        { id: 'tps_org', label: 'TPs (Org)', icon: 'folder-settings' },
        { id: 'clases_org', label: 'Clases', icon: 'book-open-page-variant' },
        { id: 'eval_org', label: 'Evals (Org)', icon: 'format-list-checks' }
      ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: modo === 'clases' ? 'Clase del día' : 'Organización',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => {
                setModo(modo === 'clases' ? 'organizacion' : 'clases');
                setTabActiva('alumnos'); // Reset a alumnos al cambiar modo
              }}
              style={styles.switchBtn}
            >
              <MaterialCommunityIcons 
                name={modo === 'clases' ? "cog" : "google-classroom"} 
                size={24} 
                color="#6200ee" 
              />
            </TouchableOpacity>
          )
        }} 
      />

      {/* Info de la Cursada */}
      <View style={styles.infoBar}>
        <Text style={styles.materiaText}>{nombreMateria}</Text>
        <Text style={styles.cursoText}>{curso}</Text>
        <Text style={{textAlign:'center', fontSize: 20, color:'gray'}}>Tema del día</Text>
      </View>

      {/* Selector de Tabs (Scrollable si hay muchas) */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              key={tab.id} 
              onPress={() => setTabActiva(tab.id)}
              style={[styles.tabItem, tabActiva === tab.id && styles.activeTabItem]}
            >
              <MaterialCommunityIcons 
                name={tab.icon as any} 
                size={20} 
                color={tabActiva === tab.id ? '#6200ee' : '#666'} 
              />
              <Text style={[styles.tabLabel, tabActiva === tab.id && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Contenido Dinámico */}
      <View style={styles.dynamicContent}>
        {tabActiva === 'alumnos' && <AlumnoTab />}
        {tabActiva === 'asistencia' && <AsistenciaTab />}
        {tabActiva === 'tps' && <TPsTab />}
        {tabActiva === 'evaluaciones' && <EvaluacionTab />}
        {tabActiva === 'calificaciones' && <PlaceholderTab text="Promedios y Informe Final" />}
        {tabActiva === 'clases_org' && <PlaceholderTab text="Libro de Temas (Cards por fecha)" />}
        {/* Agregá el resto de las condiciones aquí */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  switchBtn: { marginRight: 15, padding: 5 },
  infoBar: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  materiaText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cursoText: { fontSize: 14, color: '#666' },
  tabBar: { backgroundColor: '#fff', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  tabItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0'
  },
  activeTabItem: { backgroundColor: '#6200ee15', borderWidth: 1, borderColor: '#6200ee' },
  tabLabel: { marginLeft: 6, fontSize: 13, color: '#666', fontWeight: '500' },
  activeTabLabel: { color: '#6200ee', fontWeight: 'bold' },
  dynamicContent: { flex: 1, padding: 10 },
  tabContent: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Calendar, WeekCalendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

// Configuración de idioma (Ya lo tenías)
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['D','L','M','M','J','V','S'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

interface EventoMock {
  id: number;
  titulo: string;
  tipo: 'EVALUACION' | 'ENTREGA' | 'REUNION';
  hora?: string;
}

export default function CalendarioScreen() {
  const [vista, setVista] = useState<'semana' | 'mes'>('semana');
  const [diaSeleccionado, setDiaSeleccionado] = useState('2026-06-09'); 

  // Estado de eventos indexados por fecha
  const [eventos, setEventos] = useState<Record<string, EventoMock[]>>({
    '2026-06-09': [
      { id: 1, titulo: 'Entrega de Proyecto Software II', tipo: 'ENTREGA', hora: '18:30' },
    ],
    '2026-06-12': [
      { id: 2, titulo: 'Parcial Escrito - Base de Datos', tipo: 'EVALUACION', hora: '20:00' }
    ],
  });

  // 👇 ESTADOS PARA EL MODAL Y EL FORMULARIO
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoTipo, setNuevoTipo] = useState<'EVALUACION' | 'ENTREGA' | 'REUNION'>('REUNION');
  const [nuevaHora, setNuevaHora] = useState('');

  const eventosDelDia = eventos[diaSeleccionado] || [];

  // 👇 FUNCIÓN PARA GUARDAR EL EVENTO EN EL ESTADO
  const guardarEvento = () => {
    if (!nuevoTitulo.trim()) return;

    const nuevoEvento: EventoMock = {
      id: Date.now(), // ID numérico temporal único
      titulo: nuevoTitulo,
      tipo: nuevoTipo,
      hora: nuevaHora.trim() ? nuevaHora : undefined,
    };

    // Obtenemos los eventos que ya existen en ese día o un array vacío
    const eventosExistentes = eventos[diaSeleccionado] || [];

    // Actualizamos el objeto indexado por la fecha seleccionada
    setEventos({
      ...eventos,
      [diaSeleccionado]: [...eventosExistentes, nuevoEvento],
    });

    // Limpiamos formulario y cerramos modal
    setNuevoTitulo('');
    setNuevaHora('');
    setNuevoTipo('REUNION');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      
      {/* SELECTOR DE VISTA (TABS) */}
      <View style={styles.selectorContainer}>
        <TouchableOpacity 
          style={[styles.selectorBtn, vista === 'semana' && styles.selectorBtnActivo]}
          onPress={() => setVista('semana')}
        >
          <Text style={[styles.selectorText, vista === 'semana' && styles.selectorTextActivo]}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.selectorBtn, vista === 'mes' && styles.selectorBtnActivo]}
          onPress={() => setVista('mes')}
        >
          <Text style={[styles.selectorText, vista === 'mes' && styles.selectorTextActivo]}>Mensual</Text>
        </TouchableOpacity>
      </View>

      {/* CALENDARIO CONDICIONAL */}
      <View style={styles.calendarBox}>
        {vista === 'semana' ? (
          <WeekCalendar
            current={diaSeleccionado}
            onDayPress={(day) => setDiaSeleccionado(day.dateString)}
            markedDates={{
              [diaSeleccionado]: { selected: true, selectedColor: '#FFB703' }
            }}
            theme={themeCalendario}
          />
        ) : (
          <Calendar
            current={diaSeleccionado}
            onDayPress={(day) => setDiaSeleccionado(day.dateString)}
            markedDates={{
              ...Object.keys(eventos).reduce((acc, fecha) => ({
                ...acc,
                [fecha]: { marked: true, dotColor: '#FFB703' } // Pinta puntito si hay eventos
              }), {}),
              [diaSeleccionado]: { selected: true, selectedColor: '#FFB703', marked: eventos[diaSeleccionado]?.length > 0 }
            }}
            theme={themeCalendario}
          />
        )}
      </View>

      {/* CAJA DE EVENTOS DEL DÍA */}
      <View style={styles.eventosCard}>
        <Text style={styles.eventosTitulo}>
          Eventos del {diaSeleccionado.split('-').reverse().join('/')}
        </Text>
        
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {eventosDelDia.length === 0 ? (
            <Text style={styles.noEventos}>No hay eventos registrados para este día.</Text>
          ) : (
            eventosDelDia.map((evt) => (
              <View key={evt.id} style={styles.eventoItem}>
                <Ionicons 
                  name={evt.tipo === 'EVALUACION' ? "alert-circle" : evt.tipo === 'ENTREGA' ? "document-text" : "people"} 
                  size={20} 
                  color={evt.tipo === 'EVALUACION' ? "#d90429" : "#023047"} 
                  style={{ marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.eventoTexto}>{evt.titulo}</Text>
                  <Text style={styles.eventoHora}>{evt.hora || 'Todo el día'}</Text>
                </View>
                <Text style={styles.badgeTipo}>{evt.tipo}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* 👇 BOTÓN FLOTANTE PARA AGREGAR EVENTO */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-outline" size={24} color="white" />
      </TouchableOpacity>

      {/* 👇 MODAL DE NUEVO EVENTO */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Evento para el {diaSeleccionado.split('-').reverse().join('/')}</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título del evento (ej: Parcial Temas 1 y 2)"
              value={nuevoTitulo}
              onChangeText={setNuevoTitulo}
            />

            <TextInput
              style={styles.input}
              placeholder="Hora (ej: 18:30) - Opcional"
              value={nuevaHora}
              onChangeText={setNuevaHora}
            />

            <Text style={styles.labelSub}>Tipo de Evento:</Text>
            {/* Selector básico de tipo por botones horizontales */}
            <View style={styles.tipoSelector}>
              {(['REUNION', 'ENTREGA', 'EVALUACION'] as const).map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[styles.tipoBtn, nuevoTipo === tipo && styles.tipoBtnActivo]}
                  onPress={() => setNuevoTipo(tipo)}
                >
                  <Text style={[styles.tipoBtnText, nuevoTipo === tipo && styles.tipoBtnTextActivo]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancel}>
                <Text style={{ fontWeight: '600' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={guardarEvento} style={styles.btnSave}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

// Estilos
const themeCalendario = {
  backgroundColor: '#252525',
  calendarBackground: '#252525',
  textSectionTitleColor: '#fff',
  selectedDayBackgroundColor: '#FFB703',
  selectedDayTextColor: '#252525',
  todayTextColor: '#FFB703',
  dayTextColor: '#fff',
  textDisabledColor: 'rgba(255,255,255,0.3)',
  arrowColor: '#FFB703',
  monthTextColor: '#fff',
  textDayFontWeight: '600' as const,
  textMonthFontWeight: 'bold' as const,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  selectorContainer: { flexDirection: 'row', margin: 15, backgroundColor: '#dbdbe5', borderRadius: 12, padding: 4 },
  selectorBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  selectorBtnActivo: { backgroundColor: '#252525' },
  selectorText: { fontSize: 14, fontWeight: 'bold', color: '#252525' },
  selectorTextActivo: { color: '#fff' },
  calendarBox: { backgroundColor: '#252525', paddingBottom: 10 },
  eventosCard: { flex: 1, marginTop: 20, width: '92%', alignSelf: 'center', backgroundColor: '#dbdbe5', borderRadius: 25, padding: 20, marginBottom: 20 },
  eventosTitulo: { fontSize: 18, fontWeight: 'bold', color: '#023047', marginBottom: 15 },
  noEventos: { color: '#555', textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
  eventoItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 10, alignItems: 'center' },
  eventoTexto: { fontSize: 15, fontWeight: 'bold', color: '#023047' },
  eventoHora: { fontSize: 13, color: '#666', marginTop: 2 },
  badgeTipo: { fontSize: 10, fontWeight: 'bold', color: '#fff', backgroundColor: '#023047', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, overflow: 'hidden' },
  
  // Estilos del Botón Flotante (FAB)
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#252525', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 6 },
  
  // Estilos del Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: '#fff', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#023047', marginBottom: 15 },
  input: { width: '100%', backgroundColor: '#f0f0f5', padding: 12, borderRadius: 10, marginBottom: 12, fontSize: 15 },
  labelSub: { fontSize: 14, fontWeight: '600', color: '#023047', marginBottom: 8, marginTop: 5 },
  tipoSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  tipoBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#023047', marginHorizontal: 3 },
  tipoBtnActivo: { backgroundColor: '#023047' },
  tipoBtnText: { fontSize: 12, fontWeight: 'bold', color: '#023047' },
  tipoBtnTextActivo: { color: '#fff' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btnCancel: { flex: 1, paddingVertical: 12, alignItems: 'center', marginRight: 10, borderRadius: 10, backgroundColor: '#e0e0e0' },
  btnSave: { flex: 1, paddingVertical: 12, alignItems: 'center', marginLeft: 10, borderRadius: 10, backgroundColor: '#252525' }
});
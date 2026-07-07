// app/(drawer)/cursos/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import DetalleCursoScreen from '@/src/screens/DetalleCursoScreen';

export default function CursoDetalleRoute() {
  // Atrapamos los parámetros de la URL enviados desde la pantalla anterior
  const { id, labelCurso } = useLocalSearchParams<{ 
    id: string; 
    labelCurso?: string; 
  }>();

  return (
    <DetalleCursoScreen 
      cursoId={Number(id)} // Casteamos a número para mantener tus tipos de Prisma intactos
      labelCurso={labelCurso}
    />
  );
}
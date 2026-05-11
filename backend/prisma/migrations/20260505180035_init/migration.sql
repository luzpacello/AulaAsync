-- CreateEnum
CREATE TYPE "TipoEvaluacion" AS ENUM ('ESCRITO', 'ORAL', 'GRUPAL');

-- CreateEnum
CREATE TYPE "EstadoTp" AS ENUM ('ENTREGADO', 'FUERA_TERMINO', 'SIN_ENTREGAR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colegio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nombreComodo" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Colegio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "anio" INTEGER NOT NULL,
    "division" TEXT NOT NULL,
    "orientacion" TEXT,
    "ciclo" TEXT,
    "colegioId" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "colegioId" INTEGER NOT NULL,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cursada" (
    "id" SERIAL NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,

    CONSTRAINT "Cursada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumno" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clase" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tema" TEXT,
    "actividades" TEXT,
    "observaciones" TEXT,
    "estado" TEXT,
    "cursadaId" INTEGER NOT NULL,

    CONSTRAINT "Clase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluacion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "temas" TEXT NOT NULL,
    "tipo" "TipoEvaluacion" NOT NULL,
    "cursadaId" INTEGER NOT NULL,

    CONSTRAINT "Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" SERIAL NOT NULL,
    "calificacion" DOUBLE PRECISION NOT NULL,
    "evaluacionId" INTEGER NOT NULL,
    "alumnoId" INTEGER NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asistencia" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "asistio" BOOLEAN NOT NULL,
    "alumnoId" INTEGER NOT NULL,
    "cursadaId" INTEGER NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorarioCursada" (
    "id" SERIAL NOT NULL,
    "dia" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "cursadaId" INTEGER NOT NULL,

    CONSTRAINT "HorarioCursada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tp" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "fechaEntrega" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoTp" NOT NULL,
    "cursadaId" INTEGER NOT NULL,

    CONSTRAINT "Tp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrega" (
    "id" SERIAL NOT NULL,
    "fechaEntrega" TIMESTAMP(3) NOT NULL,
    "nota" DOUBLE PRECISION,
    "observaciones" TEXT,
    "tipoEntrega" TEXT NOT NULL,
    "tpId" INTEGER NOT NULL,
    "alumnoId" INTEGER NOT NULL,

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cursada_cursoId_materiaId_key" ON "Cursada"("cursoId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_documento_key" ON "Alumno"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Nota_evaluacionId_alumnoId_key" ON "Nota"("evaluacionId", "alumnoId");

-- CreateIndex
CREATE UNIQUE INDEX "Asistencia_alumnoId_cursadaId_fecha_key" ON "Asistencia"("alumnoId", "cursadaId", "fecha");

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_tpId_alumnoId_key" ON "Entrega"("tpId", "alumnoId");

-- AddForeignKey
ALTER TABLE "Colegio" ADD CONSTRAINT "Colegio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_colegioId_fkey" FOREIGN KEY ("colegioId") REFERENCES "Colegio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_colegioId_fkey" FOREIGN KEY ("colegioId") REFERENCES "Colegio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursada" ADD CONSTRAINT "Cursada_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cursada" ADD CONSTRAINT "Cursada_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clase" ADD CONSTRAINT "Clase_cursadaId_fkey" FOREIGN KEY ("cursadaId") REFERENCES "Cursada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_cursadaId_fkey" FOREIGN KEY ("cursadaId") REFERENCES "Cursada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_evaluacionId_fkey" FOREIGN KEY ("evaluacionId") REFERENCES "Evaluacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asistencia" ADD CONSTRAINT "Asistencia_cursadaId_fkey" FOREIGN KEY ("cursadaId") REFERENCES "Cursada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorarioCursada" ADD CONSTRAINT "HorarioCursada_cursadaId_fkey" FOREIGN KEY ("cursadaId") REFERENCES "Cursada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tp" ADD CONSTRAINT "Tp_cursadaId_fkey" FOREIGN KEY ("cursadaId") REFERENCES "Cursada"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_tpId_fkey" FOREIGN KEY ("tpId") REFERENCES "Tp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "Alumno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

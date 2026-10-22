/*
  Ejemplos de la herramienta «¿Qué tareas automatizar primero?» (21 oct 2026).

  Diez tareas que se repiten en muchas empresas, agrupadas por departamento,
  que es como ordenan los ejemplos las páginas que hoy salen en Google para
  «procesos que se pueden automatizar». Cada una lleva unas respuestas de
  ejemplo, sin el nombre (que va en el texto de cada idioma).

  Lo que la página dice de cada ejemplo NO se escribe a mano: el componente
  pasa estas respuestas por `analiza` al compilar y pinta lo que sale. Así el
  ejemplo no puede contradecir a la herramienta cuando cambien las reglas.
  `npm run check:herramienta` comprueba que cada uno contesta todas las
  preguntas que la herramienta haría.

  El botón «Probar con esta tarea» carga estas respuestas en la herramienta
  para que la persona las cambie por las suyas. También se cargan desde la
  dirección (`?ejemplo=facturas`), para enlazar un ejemplo desde otra página.
*/
import type { A } from './que-automatizar';

export type Departamento = 'finanzas' | 'clientes' | 'ventas' | 'personas' | 'informes' | 'oficina';
export type Ejemplo = { id: string; dep: Departamento; a: A };

export const DEPARTAMENTOS: Departamento[] = ['finanzas', 'clientes', 'ventas', 'personas', 'informes', 'oficina'];

export const EJEMPLOS: Ejemplo[] = [
  {
    id: 'facturas',
    dep: 'finanzas',
    a: { veces: 'dia', min: 'm3', hace: ['leer', 'normas'], normas: 'lista', pasos: 'casi', info: ['correos'], sensibles: 'personales', destino: 'programa', revisa: 'dudosos', riesgo: 'cuesta', fallos: 'f6', coste: 'c25', tiempo: 'pagar', hora: 'h25' },
  },
  {
    id: 'conciliar',
    dep: 'finanzas',
    a: { veces: 'semana', min: 'm22', hace: ['normas', 'cuentas'], normas: 'lista', pasos: 'igual', info: ['programa'], sensibles: 'personales', destino: 'programa', revisa: 'dudosos', riesgo: 'cuesta', fallos: 'f1', coste: 'c25', tiempo: 'nada' },
  },
  {
    id: 'consultas',
    dep: 'clientes',
    a: { veces: 'decenas', min: 'm3', hace: ['leer', 'escribir'], pasos: 'casi', info: ['programa', 'correos'], sensibles: 'personales', destino: 'cliente', revisa: 'dudosos', riesgo: 'cuesta', fallos: 'f6', coste: 'c150', tiempo: 'vender', hora: 'h40' },
  },
  {
    id: 'citas',
    dep: 'clientes',
    a: { veces: 'decenas', min: 'm3', hace: ['leer', 'escribir', 'repartir'], pasos: 'conversa', info: ['programa'], sensibles: 'personales', destino: 'cliente', revisa: 'dudosos', riesgo: 'cuesta', fallos: 'f20', coste: 'c25', tiempo: 'vender', hora: 'h40' },
  },
  {
    id: 'presupuestos',
    dep: 'ventas',
    a: { veces: 'diaria', min: 'm45', hace: ['leer', 'cuentas', 'escribir'], pasos: 'casi', info: ['programa', 'correos'], sensibles: 'no', destino: 'cliente', revisa: 'todo', riesgo: 'cuesta', fallos: 'f6', coste: 'c600', tiempo: 'vender', hora: 'h60' },
  },
  {
    id: 'crm',
    dep: 'ventas',
    a: { veces: 'dia', min: 'm3', hace: ['leer', 'escribir'], pasos: 'igual', info: ['correos'], sensibles: 'personales', destino: 'programa', revisa: 'dudosos', riesgo: 'leve', fallos: 'f6', coste: 'c150', tiempo: 'vender', hora: 'h40' },
  },
  {
    id: 'alta',
    dep: 'personas',
    a: { veces: 'pocas', min: 'm45', hace: ['normas'], normas: 'lista', pasos: 'igual', info: ['programa'], sensibles: 'personales', destino: 'programa', revisa: 'todo', riesgo: 'cuesta', fallos: 'f1', coste: 'c25', tiempo: 'nada' },
  },
  {
    id: 'informe',
    dep: 'informes',
    a: { veces: 'semana', min: 'm45', hace: ['normas', 'cuentas'], normas: 'lista', pasos: 'igual', info: ['programa'], sensibles: 'no', destino: 'equipo', revisa: 'no', riesgo: 'leve', fallos: 'f0', tiempo: 'nada' },
  },
  {
    id: 'reuniones',
    dep: 'oficina',
    a: { veces: 'semana', min: 'm22', hace: ['escribir'], pasos: 'igual', info: ['programa'], sensibles: 'no', destino: 'equipo', revisa: 'todo', riesgo: 'leve', fallos: 'f0', tiempo: 'nada' },
  },
  {
    id: 'correos',
    dep: 'oficina',
    a: { veces: 'cientos', min: 'm3', hace: ['leer', 'normas'], normas: 'lista', pasos: 'casi', info: ['correos'], sensibles: 'personales', destino: 'equipo', revisa: 'dudosos', riesgo: 'leve', fallos: 'f20', coste: 'c25', tiempo: 'pagar', hora: 'h25' },
  },
];

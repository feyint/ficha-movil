export type FNBINFSAL = {
  ID: number;
  PESO: number;
  TALLA: number;
  TA_SISTOLICA: number;
  TA_DIASTOLICA: number;
  USO_PROTESIS: number;
  TIEMPO_PROTESIS: number;
  ULTIMA_VISITA: Date;
  FECHA_MUERTE: Date;
  DEFUNCION: string;
  FECHA_ACTIVIDAD: Date;
  USUARIO_DATA: string;
  FECHA_CREACION: Date;
  ORIGEN_DATA: string;
};
export type FNBINFSAL_FNCCONSAL = {
  ID?: number;
  FNCCONSAL_ID: number;
  FNBINFSAL_ID: number;
  FNCELESAL_ID: number;
  SYNCSTATE: number;
};
export type FNCSALREP = {
  ID: number;
  FNCPERSON_ID: number;
  EDAD_PRIMERA_REGLA: number;
  GRAVIDEZ: number;
  PARIDEZ: number;
  ABORTO: number;
  CESAREA: number;
  NACIDOS_VIVOS: number;
  NACIDOS_MUERTOS: number;
  PARTO_ULTIMO: Date;
  ULTIMA_REGLA: Date;
  EDAD_GESTACION: string;
  PARTO_ESTIMADO: Date;
  PRESENCIA_FAM: number;
  SEROLOGIA: number;
  VIH: number;
  RESUL_CITOLOGIA: string;
  ACCION_CITOLOGIA: number;
  RESUL_PROSTATA: string;
  ACCION_PROSTATA: number;
  USUARIO_DATA: string;
  FECHA_ACTIVIDAD: Date;
  FECHA_CREACION: Date;
  ORIGEN_DATA: string;
  FNCPERSON_ID: number;
};
export type FNCSALREP_FNCCONREP = {
  ID?: number;
  FNCSALREP_ID: number;
  FNCCONREP_ID: number;
  FNCELEREP_ID: number;
  SYNCSTATE: number;
};

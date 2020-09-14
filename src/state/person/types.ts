export type FUBUBIVIV = {
  ID: number;
  CODIGO: string;
  DIRECCION: string;
  COORDENADA_X: number;
  COORDENADA_Y: number;
  HUMO_CASA: boolean;
  NUM_NUCLEOS: number;
  FECHA_ACTIVIDAD: Date;
  FECHA_CREACION: Date;
  ORIGEN_DATA: string;
  USUARIO_DATA: string;
  FUCBARVER_ID: number;
};
export type FNBNUCVIV = {
  ID: number;
  CODIGO: string;
  HUMO_CASA: boolean;
  ORIGEN_DATA: string;
  USUARIO_DATA: string;
  FUCBARVER_ID: number;
  RESIDUO_BOR: string;
  RESIDUO_PELIGROSO: string;
  ANIMAL_VACUNADO: number;
  ANIMAL_NOVACUNADO: number;
  RIESGO: boolean;
  OBSERVACION: string;
  LUGAR_COCINA: string;
  HUMO_DENTRO: string;
  ACCESO_INTERNET: boolean;
  TOTAL_ANIMAL: number;
  FECHA_ACTIVIDAD: Date;
  FECHA_CREACION: Date;
  FUBUBIVIV_ID: number;
  FUBUBIVIV_CODE: string;
};
export type FNBNUCVIV_FVCCONVIV = {
  ID?: number;
  FNBNUCVIV_ID: number;
  FVCCONVIV_ID: number;
  FVCELEVIV_ID: number;
  SYNCSTATE: number;
};
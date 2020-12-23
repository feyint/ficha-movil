import {FncpersonFncconperSync} from './FncpersonFncconperSync';
import {FncsalrepSync} from './FncsalrepSync';
import {StatusSync} from './StatusSync';
import {AssociationSync} from './AssociationSync';
import {FnbinfsalSync} from './FnbinfsalSync';
export interface FncpersonSync {
  status?: StatusSync;
  id?: string;
  codigo: string;
  correoElectronico: string;
  fechaNacimiento: string;
  identificacion: string;
  primerApellido: string;
  primerNombre: string;
  segundoApellido: string;
  segundoNombre: string;
  telAlterno: string;
  telCelular: string;
  origenData: string;
  usuarioData: string;
  fncgenero: AssociationSync;
  fnclunind: AssociationSync;
  fncocupac: AssociationSync;
  fncorgani: AssociationSync;
  fncparen: AssociationSync;
  fnctipide: AssociationSync;
  fucmunici: AssociationSync;
  fvbencue: AssociationSync;
  fncsalrep: FncsalrepSync;
  fnbinfsal: FnbinfsalSync;
  fncpersonFncconper: FncpersonFncconperSync;
}

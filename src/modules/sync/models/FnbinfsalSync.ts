import {FnbinfsalFncdesarmSync} from './FnbinfsalFncdesarmSync';
import {FnbinfsalFncconsalSync} from './FnbinfsalFncconsalSync';
import {AssociationSync} from './AssociationSync';
export interface FnbinfsalSync {
  id?: string;
  talla: string;
  taSistolica: string;
  taDiastolica: string;
  usoProtesis: string;
  tiempoProtesis: string;
  ultimaVisita: string;
  fechaMuerte: string;
  defuncion: string;
  peso: string;
  usuarioData: string;
  origenData: string;
  fncintimc: AssociationSync;
  fncinttea: AssociationSync;
  fnbinfsalFncconsal: FnbinfsalFncconsalSync[];
  fnbinfsalFncdesarm: FnbinfsalFncdesarmSync[];
}

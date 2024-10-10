import { DataCatalogo } from "./dataCatalogo.model";
import { Ubigeo } from "./ubigeo.model";
import { Usuario } from "./usuario.model";

export class EntidadFinanciera2 {
    idEntidadFinanciera?: number;
    nombre?:string;
    gerente?:string;
    ubigeo?: Ubigeo;
    tipoEntidad?: DataCatalogo;
    estado?: number;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
    
}

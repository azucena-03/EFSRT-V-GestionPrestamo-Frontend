import { DataCatalogo } from "./dataCatalogo.model";
import { Usuario } from "./usuario.model";
import { EntidadFinanciera2 } from "./entidad-financiera2.model";

export class Cuenta {
    idCuenta?: number;
    numero?:string;
    entidadFinanciera?:EntidadFinanciera2;
    tipoMoneda?:DataCatalogo;
    estado?:number;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}


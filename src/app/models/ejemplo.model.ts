import { DataCatalogo } from "./dataCatalogo.model";
import { Pais } from "./pais.model";
import { Ubigeo } from "./ubigeo.model";
import { Usuario } from "./usuario.model";


export class Ejemplo {

    idEjemplo?: number;
    descripcion?:string;
    pais?: Pais;
    ubigeo?: Ubigeo;
    longitud?: number ;
    dias?: DataCatalogo;
    estado?: number;
    usuarioPrestatario?:Usuario;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}

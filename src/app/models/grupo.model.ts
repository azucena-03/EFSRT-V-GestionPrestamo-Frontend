import { Ubigeo } from "./ubigeo.model";
import { Usuario } from "./usuario.model";

export class Grupo {
    idGrupo?: number;
    descripcion?:string;
    ubigeo?: Ubigeo;
    estado?: number;
    usuarioLider?:Usuario;
    usuarioRegistro?:Usuario;
    usuarioActualiza?:Usuario;
}

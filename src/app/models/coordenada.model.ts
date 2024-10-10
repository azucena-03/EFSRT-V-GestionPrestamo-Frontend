import { Ubigeo } from "./ubigeo.model";
import { Usuario } from "./usuario.model";

export class Coordenada {
    idCoordenada?: number;
    latitud?: number;
    longitud?: number;
    prestatario?: Usuario;
    ubigeo?: Ubigeo;
    estado?: number;
    usuarioRegistro?: Usuario;
    usuarioActualiza?: Usuario;
}

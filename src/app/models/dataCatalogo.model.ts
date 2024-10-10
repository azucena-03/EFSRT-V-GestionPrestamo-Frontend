import { Usuario } from "./usuario.model";
import { Catalogo } from './catalogo.model';

export class DataCatalogo {

    idDataCatalogo?: number;
    descripcion?: string;
    catalogo?: Catalogo;
    estado?: number;
    usuarioPrestatario?:Usuario;
    usuarioRegistro?:Usuario;
}

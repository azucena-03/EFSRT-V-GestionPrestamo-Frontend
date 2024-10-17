import { DataCatalogo } from './dataCatalogo.model';
import { Usuario } from './usuario.model';

export class SolicitudPrestamo {
  idSolicitud?: number;
  capital?: number;
  dias?: DataCatalogo;
  montoPagar?: number;
  fechaInicioPrestamo?: Date;
  fechaFinPrestamo?: Date;
  estadoSolicitud?: DataCatalogo;
  usuarioPrestatario?: Usuario;
  estado?: number;
  fechaRegistro?: Date;
  fechaActualizacion?: Date;
  usuarioRegistro?: Usuario;
  usuarioActualiza?: Usuario;
}

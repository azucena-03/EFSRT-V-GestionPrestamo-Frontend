import { MenuComponent } from '../../menu/menu.component';
import { AppMaterialModule } from '../../app.material.module';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudPrestamo } from '../../models/solicitud-prestamo.model';
import { PrestamoService } from '../../services/solicitud-prestamo.service';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-crud-solicitud-prestamo-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './crud-solicitud-prestamo-actualizar.component.html',
  styleUrl: './crud-solicitud-prestamo-actualizar.component.css',
})
export class CrudSolicitudPrestamoActualizarComponent {
  lstDias: DataCatalogo[] = [];

  objSolicitud: SolicitudPrestamo = {
    capital: 0,
    dias: {
      idDataCatalogo: -1,
    },
    montoPagar: 0,
    fechaInicioPrestamo: new Date(),
    fechaFinPrestamo: new Date(),
    estadoSolicitud: {
      idDataCatalogo: 12,
    },
  };
  objUsuario: Usuario = {};
  constructor(
    private utilService: UtilService,
    private tokenService: TokenService,
    private prestamoService: PrestamoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.objSolicitud = data;
    this.utilService.listaDiasPrestamo().subscribe((x) => (this.lstDias = x));
    this.objUsuario.idUsuario = tokenService.getUserId();
  }
  actualizar() {
    this.objSolicitud.usuarioActualiza = this.objUsuario;
    this.objSolicitud.usuarioRegistro = this.objUsuario;
    this.prestamoService.actualizarCrud(this.objSolicitud).subscribe((x) => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: x.mensaje,
      });
    });
  }
}

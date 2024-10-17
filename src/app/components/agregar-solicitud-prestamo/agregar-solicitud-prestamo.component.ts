import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';
import { PrestamoService } from '../../services/solicitud-prestamo.service';
import { SolicitudPrestamo } from '../../models/solicitud-prestamo.model';

@Component({
  selector: 'app-agregar-solicitud-prestamo',
  standalone: true,
  imports: [
    AppMaterialModule,
    FormsModule,
    CommonModule,
    MenuComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './agregar-solicitud-prestamo.component.html',
  styleUrl: './agregar-solicitud-prestamo.component.css',
})
export class AgregarSolicitudPrestamoComponent {
  lstDias: DataCatalogo[] = [];
  lstEstado: DataCatalogo[] = [];
  objUsuario: Usuario = {};

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

  constructor(
    private utilService: UtilService,
    private tokenService: TokenService,
    private prestamoService: PrestamoService
  ) {
    this.utilService.listaDiasPrestamo().subscribe((x) => (this.lstDias = x));
    this.utilService
      .listaEstadoSolicitud()
      .subscribe((x) => (this.lstEstado = x));
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra() {
    this.objSolicitud.usuarioPrestatario = this.objUsuario;
    this.objSolicitud.usuarioRegistro = this.objUsuario;
    this.objSolicitud.usuarioActualiza = this.objUsuario;

    this.prestamoService.registrar(this.objSolicitud).subscribe((x) => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: x.mensaje,
      });
    });
  }
}

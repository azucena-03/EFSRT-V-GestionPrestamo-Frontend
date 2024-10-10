import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MontoPrestamo } from '../../models/monto-prestamo.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { MontoPrestamoService } from '../../services/monto-prestamo.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-monto-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-monto-prestamo.component.html',
  styleUrl: './agregar-monto-prestamo.component.css'
})
export class AgregarMontoPrestamoComponent {
  montoPrestamo: MontoPrestamo = {
    capital: 0,
    dias: {
      idDataCatalogo: -1
    },
    monto: 0,
    usuarioRegistro: {
      idUsuario: -1
    },
    usuarioActualiza: {
      idUsuario: -1
    }
  }

  formRegistrar = this.formBuilder.group({
    validaMonto: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    validaCapital: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    validaDias: ['', [Validators.required, Validators.min(1)]]
  });

  lstDias: DataCatalogo[] = [];
  objUsuario: Usuario = {};

  constructor(
    private montoPrestamoService: MontoPrestamoService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    console.log(">>>>> constructor >>>>");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.utilService.listaDiasPrestamo().subscribe(
      x => this.lstDias = x
    )
    this.objUsuario.idUsuario = this.tokenService.getUserId();
  }

  registra() {
    console.log(">>> registra [inicio]");
    // Verificar que los campos no sean 0
    if (this.montoPrestamo.capital === 0 || this.montoPrestamo.monto === 0) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Los campos Capital y Monto no pueden ser 0.' });
      return; // Evitar continuar con el registro si alguno es 0
    }

    this.montoPrestamo.usuarioActualiza = this.objUsuario;
    this.montoPrestamo.usuarioRegistro = this.objUsuario;
    console.log(">>> registra [inicio] " + this.montoPrestamo);
    console.log(this.montoPrestamo);

    this.montoPrestamoService.registrar(this.montoPrestamo).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje });
        this.montoPrestamo = {
          capital: 0,
          dias: {
            idDataCatalogo: -1
          },
          monto: 0,
          usuarioRegistro: {
            idUsuario: -1
          },
          usuarioActualiza: {
            idUsuario: -1
          }
        };
      }
    );
  }


}

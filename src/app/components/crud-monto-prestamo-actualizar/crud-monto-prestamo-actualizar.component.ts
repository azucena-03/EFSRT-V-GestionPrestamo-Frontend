import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, Form, FormControl } from '@angular/forms';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { map } from 'rxjs';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MontoPrestamo } from '../../models/monto-prestamo.model';
import { MontoPrestamoService } from '../../services/monto-prestamo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


  @Component({
  selector: 'app-crud-monto-prestamo-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-monto-prestamo-actualizar.component.html',
  styleUrl: './crud-monto-prestamo-actualizar.component.css'
})
    export class CrudMontoPrestamoActualizarComponent {
    montoPrestamo : MontoPrestamo = {
    capital: 0,
    dias:{
      idDataCatalogo: -1
    },
    monto: 0,
    usuarioRegistro:{
      idUsuario: -1
    },
    usuarioActualiza:{
      idUsuario: -1
    }
    }

    formRegistrar = this.formBuilder.group({
    validaMonto: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]],
    validaCapital: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    validaDias: ['', [Validators.min(1)]]
   });

    lstDias : DataCatalogo[] = [];

    //usuario en sesion
   objUsuario: Usuario = {};


    constructor(private montoprestamoService: MontoPrestamoService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MontoPrestamo) {

      //Pasar el objeto a la variable
      this.montoPrestamo = data;

      console.log(">>> constructor  >>> ");
      }

    ngOnInit() {
    console.log(">>> OnInit [inicio]");

    this.utilService.listaDiasPrestamo().subscribe(
      x => this.lstDias = x
    )

    this.objUsuario.idUsuario = this.tokenService.getUserId();
    }

    actualiza() {
    console.log(">>> actualiza [inicio]");
    this.montoPrestamo.usuarioActualiza = this.objUsuario;
    this.montoPrestamo.usuarioRegistro = this.objUsuario;
    console.log(">>> actualiza [inicio] " + this.montoPrestamo);
    console.log(this.montoPrestamo);


    this.montoprestamoService.actualizarCrud(this.montoPrestamo).subscribe(
      x=>{
            Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
            this.montoPrestamo ={
              capital: 0,
              dias:{
                idDataCatalogo: -1
              },
              monto: 0,
              usuarioRegistro:{
                idUsuario: -1
              },
              usuarioActualiza:{
                idUsuario: -1
              }
            };
        }
    );

  }
  salir() {
  }

}

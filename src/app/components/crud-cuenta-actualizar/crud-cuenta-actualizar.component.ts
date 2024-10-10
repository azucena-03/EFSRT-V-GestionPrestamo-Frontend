import { Component, Inject, } from '@angular/core';
import { map } from 'rxjs';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Cuenta } from '../../models/cuenta.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { EntidadFinanciera2 } from '../../models/entidad-financiera2.model';
import { Usuario } from '../../models/usuario.model';
import { CuentaService } from '../../services/cuenta.service';
import { TokenService } from '../../security/token.service';
import { UtilService } from '../../services/util.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-crud-cuenta-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-cuenta-actualizar.component.html',
  styleUrl: './crud-cuenta-actualizar.component.css'
})
export class CrudCuentaActualizarComponent {

  cuenta: Cuenta = {
    numero: "",
    entidadFinanciera: {
      idEntidadFinanciera: -1,
      nombre: "",
      tipoEntidad: {
        idDataCatalogo: -1,
        descripcion: "",
      },
    },
    tipoMoneda: {
      idDataCatalogo: -1,
    },
    usuarioRegistro: {
      idUsuario: -1,
    },
    usuarioActualiza: {

      idUsuario: -1,
    },
  }

  formRegistrar = this.formBuilder.group({
    validaNumero: ['', [Validators.required, Validators.pattern('^[0-9]{20}$')], this.validaNumero.bind(this)],
    validaTipoEntidad: ['', [Validators.required, Validators.min(1)]],
    validaEntidadFinanciera: ['', [Validators.required, Validators.min(1)]],
    validaTipoMoneda: ['', [Validators.required, Validators.min(1)]],
  });

  //lista de DataCatalogo
  lstTipoEntidad: DataCatalogo[] = [];
  lstTipoMoneda: DataCatalogo[] = [];
  lstEntidadesFinancieras: EntidadFinanciera2[] = [];
  lstEntidadesFinancierasO: EntidadFinanciera2[] = [];
  objUsuario: Usuario = {};

  constructor(private CuentaService: CuentaService,
    private TokenService: TokenService,
    private UtilService: UtilService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta) {
    this.cuenta = data;
    console.log("entro a agregar cuenta " + data.entidadFinanciera?.tipoEntidad?.descripcion);
    console.log("entro a agregar cuenta " + data.entidadFinanciera?.nombre);
    console.log("entro a agregar cuenta");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");

    this.UtilService.listaTipoEntidadBancaria().subscribe(
      x => {
        this.lstTipoEntidad = x;
        this.setTipoEntidadChange();
      }
    );
    this.UtilService.listaTipoMoneda().subscribe(
      x => this.lstTipoMoneda = x
    );
    this.CuentaService.listaFinanciera().subscribe(
      x => {
        this.lstEntidadesFinancieras = x;
        this.lstEntidadesFinancierasO = [...x];
        this.setTipoEntidadChange();
      }
    );
    this.objUsuario.idUsuario = this.TokenService.getUserId();
    console.log(">>> OnInit >>> 1 data actu >>" + this.lstTipoEntidad);
    console.log(">>> OnInit >>> 2 >>" + this.lstTipoMoneda.length);
  }

  actualiza() {
    console.log(">>> registra [inicio]");
    this.cuenta.usuarioRegistro = this.objUsuario;
    this.cuenta.usuarioActualiza = this.objUsuario;
    console.log(">>> registra [cuenta]" + this.cuenta);
    console.log(this.cuenta);
    this.CuentaService.actualizarCrud(this.cuenta).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
        this.cuenta = {
          numero: "",
          entidadFinanciera: {
            idEntidadFinanciera: -1,
          },
          tipoMoneda: {
            idDataCatalogo: -1,
          },
          usuarioRegistro: {
            idUsuario: -1,
          },
          usuarioActualiza: {

            idUsuario: -1,
          },
        }
      }
    );
  }

  onTipoEntidadChange(tipoEntidadId: number) {
    this.lstEntidadesFinancieras = this.lstEntidadesFinancierasO.filter(entidad => entidad.tipoEntidad?.idDataCatalogo === tipoEntidadId);
  }

  setTipoEntidadChange() {
    if (this.cuenta.entidadFinanciera?.tipoEntidad?.idDataCatalogo) {
      this.onTipoEntidadChange(this.cuenta.entidadFinanciera.tipoEntidad.idDataCatalogo);
    }
  }
  validaNumero(control: FormControl) {
    console.log(">>> validaNumero [inicio]" + control.value);

    return this.CuentaService.validaNrocuentaActualiza(control.value, this.cuenta.idCuenta || 0).pipe(
      map((resp: any) => {
        console.log(">>> validaNumero [resp]" + resp.valid);
        return (resp.valid) ? null : { existeNumero: true };
      })
    );
  }

  salir() {
  }
}

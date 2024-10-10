import { Component } from '@angular/core';
import { Cuenta } from '../../models/cuenta.model';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { CuentaService } from '../../services/cuenta.service';
import { TokenService } from '../../security/token.service';
import { UtilService } from '../../services/util.service';
import Swal from 'sweetalert2';
import { MenuComponent } from '../../menu/menu.component';
import { AppMaterialModule } from '../../app.material.module';
import { CommonModule } from '@angular/common';
import { EntidadFinanciera2 } from '../../models/entidad-financiera2.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-crud-cuenta-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-cuenta-agregar.component.html',
  styleUrl: './crud-cuenta-agregar.component.css'
})
export class CrudCuentaAgregarComponent {

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
  objUsuario: Usuario = {};
  constructor(private CuentaService: CuentaService,
    private TokenService: TokenService,
    private UtilService: UtilService,
    private formBuilder: FormBuilder) {

    console.log("entro a agregar cuenta")
  }
  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.UtilService.listaTipoEntidadBancaria().subscribe(
      x => this.lstTipoEntidad = x
    );
    this.UtilService.listaTipoMoneda().subscribe(
      x => this.lstTipoMoneda = x
    );
    this.objUsuario.idUsuario = this.TokenService.getUserId();
    console.log(">>> OnInit >>> 1 >>" + this.lstTipoEntidad.length);
    console.log(">>> OnInit >>> 2 >>" + this.lstTipoMoneda.length);
  }

  registra() {
    console.log(">>> registra [inicio]");
    this.cuenta.usuarioRegistro = this.objUsuario;
    this.cuenta.usuarioActualiza = this.objUsuario;
    console.log(">>> registra [cuenta]" + this.cuenta);
    console.log(this.cuenta);
    this.CuentaService.registrar(this.cuenta).subscribe(
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

  filtrarEntidades(tipoEntidadId: number) {
    // Filtrar y cargar entidades financieras basadas en el tipo de entidad seleccionado
    if (tipoEntidadId <= 0) {
      this.lstEntidadesFinancieras = [];
      return;
    }

    this.CuentaService.listaFinanciera().subscribe(
      x => {
        this.lstEntidadesFinancieras = x.filter(entidad => entidad.tipoEntidad?.idDataCatalogo === tipoEntidadId);
      }
    );
  }
  validaNumero(control: FormControl) {
    console.log(">>> validaNumero [inicio]" + control.value);

    return this.CuentaService.validaNrocuentaRegistra(control.value).pipe(
      map((resp: any) => {
        console.log(">>> validaNumero [resp]" + resp.valid);
        return (resp.valid) ? null : { existeNumero: true };
      })
    );
  }

  salir() {
  }
}

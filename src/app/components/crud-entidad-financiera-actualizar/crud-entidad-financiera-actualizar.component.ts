import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { DataCatalogoService } from '../../services/data-catalogo.service';
import { EntidadFinancieraService } from '../../services/entidad-financiera.service';
import { Usuario } from '../../models/usuario.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Ubigeo } from '../../models/ubigeo.model';
import { EntidadFinanciera } from '../../models/entidad-financiera.model';
import { map } from 'rxjs';
import { MenuComponent } from "../../menu/menu.component";
import { AppMaterialModule } from '../../app.material.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-crud-entidad-financiera-actualizar',
    standalone: true,
    templateUrl: './crud-entidad-financiera-actualizar.component.html',
    styleUrl: './crud-entidad-financiera-actualizar.component.css',
    imports: [AppMaterialModule,
      FormsModule,
      CommonModule,
      MenuComponent,
      ReactiveFormsModule,]
})
export class CrudEntidadFinancieraActualizarComponent {

  alir() {
    throw new Error('Method not implemented.');
  }

  entidadFinanciera: EntidadFinanciera = {
    nombre: '',
    gerente: '',
    ubigeo: {
      idUbigeo: -1,
      departamento: '-1',
      provincia: '-1',
      distrito: '',
    },
    tipoEntidad: {
      idDataCatalogo: -1,
    },
    usuarioRegistro: {
      idUsuario: -1,
    },
    usuarioActualiza: {
      idUsuario: -1,
    },
  };

  formRegistrar = this.formBuilder.group({
    validaDescripcion: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')],
      this.validaDescripcion.bind(this),
    ],
    validaGerente: [
      '',
      [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')],
      this.validaDescripcion.bind(this),
    ],
    validaDepartamento: ['', [Validators.min(1)]],
    validaProvincia: ['', [Validators.min(1)]],
    validaDistrito: ['', [Validators.min(1)]],
    validaTipoEntidad: ['', [Validators.min(1)]],
  });

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  lstTipoEntidad: DataCatalogo[] = [];

  objUsuario: Usuario = {};

  constructor(
    private EntidadFinancieraService: EntidadFinancieraService,
    private DataCatalogo: DataCatalogoService,
    private TokenService: TokenService,
    private UtilService: UtilService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EntidadFinanciera

    
  ) {
    console.log('entro a agregar cuenta');
    this.entidadFinanciera = data;
  }

  ngOnInit() {
    console.log('>>> OnInit [inicio]');
    this.UtilService.listaTipoEntidadBancaria().subscribe(
      (x) => (this.lstTipoEntidad = x)
    );
    console.log('>>> OnInit [inicio]');
    this.UtilService.listarDepartamento().subscribe(
      (x) => (this.departamentos = x)
    );
    this.UtilService.listaProvincias(this.entidadFinanciera.ubigeo?.departamento).subscribe(
      x => this.provincias = x
  );
    this.UtilService.listaDistritos(this.entidadFinanciera.ubigeo?.departamento,this.entidadFinanciera.ubigeo?.provincia).subscribe(
      x => this.distritos = x
  );

    this.objUsuario.idUsuario = this.TokenService.getUserId();
    console.log('>>> onInit >>> 1 >>' + this.lstTipoEntidad.length);
  }

  actualiza() {
    console.log('>>> actualiza [inicio]');
    this.entidadFinanciera.usuarioActualiza = this.objUsuario;
    this.entidadFinanciera.usuarioRegistro = this.objUsuario;
    console.log('>>> actualiza [cuenta]' + this.entidadFinanciera);
    

    this.EntidadFinancieraService.actualizarCrud(this.entidadFinanciera).subscribe(
      (x) => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
        this.entidadFinanciera = {
          nombre: '',
          gerente: '',
          ubigeo: {
            idUbigeo: -1,
            departamento: '-1',
            provincia: '-1',
            distrito: '',
          },
          tipoEntidad: {
            idDataCatalogo: -1,
          },
          usuarioRegistro: {
            idUsuario: -1,
          },
          usuarioActualiza: {
            idUsuario: -1,
          },
        };
      }
    );
  }

  validaDescripcion(control: FormControl) {
    console.log('>>> validaDescripcion [inicio] ' + control.value);

    return this.EntidadFinancieraService.validaDescripcionRegistra(
      control.value
    ).pipe(
      map((resp: any) => {
        console.log('>>> validaDescripcion [resp] ' + resp.valid);
        return resp.valid ? null : { existeDescripcion: true };
      })
    );
  }

  listaProvincia() {
    console.log('listaProvincia>>> ' + this.entidadFinanciera.ubigeo?.departamento);
    this.UtilService.listaProvincias(this.entidadFinanciera.ubigeo?.departamento).subscribe(
      (x) => (this.provincias = x));
  }

  listaDistrito() {
    console.log(
      'listaDistrito>>> ' + this.entidadFinanciera.ubigeo?.departamento
    );
    console.log('listaDistrito>>> ' + this.entidadFinanciera.ubigeo?.provincia);
    this.UtilService.listaDistritos(
      this.entidadFinanciera.ubigeo?.departamento,
      this.entidadFinanciera.ubigeo?.provincia
    ).subscribe((x) => (this.distritos = x));
  }

  salir(){
    
  }

}

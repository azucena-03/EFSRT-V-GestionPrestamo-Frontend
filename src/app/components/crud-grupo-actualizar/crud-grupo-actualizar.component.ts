import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Grupo } from '../../models/grupo.model';
import { Ubigeo } from '../../models/ubigeo.model';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { GrupoService } from '../../services/grupo.service';
import { TokenService } from '../../security/token.service';
import { UtilService } from '../../services/util.service';
import { map } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-grupo-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-grupo-actualizar.component.html',
  styleUrls: ['./crud-grupo-actualizar.component.css']
})
export class CrudGrupoActualizarComponent {

  grupo: Grupo = {
    descripcion: "",
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    },
    usuarioLider: {
      idUsuario: -1 
    },
    usuarioRegistro: {
      idUsuario: -1
    },
    usuarioActualiza: {
      idUsuario: -1
    }
  }

  formRegistrar = this.formBuilder.group({
    validaDescripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')], this.validaDescripcion.bind(this)],
    validaDepartamento: ['', [Validators.min(1)]],
    validaProvincia: ['', [Validators.min(1)]],
    validaDistrito: ['', [Validators.min(1)]],
    validaLider: ['', [Validators.min(1)]],
  });

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  lstLider: Usuario[] = [];
  lstPrestamistasTotales: Usuario[] = [];

  objUsuario: Usuario = {};

  constructor(
    private grupoService: GrupoService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Grupo) {
    console.log(">>> constructor  >>> ");
    if (data) {
      this.grupo = data;
    }
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.utilService.listarDepartamento().subscribe(
      x => this.departamentos = x
    );

    this.utilService.listaJefePrestamistaTotales().subscribe(
      x => this.lstPrestamistasTotales = x
    );

    if (this.grupo.ubigeo?.departamento && this.grupo.ubigeo.departamento !== "-1") {
      this.listaProvincia();
    }

    if (this.grupo.ubigeo?.provincia && this.grupo.ubigeo.provincia !== "-1") {
      this.listaDistrito();
    }

    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit >>> " + this.departamentos);
  }

  actualiza() {
    console.log(">>> registra [inicio]");
    this.grupo.usuarioActualiza = this.objUsuario;
    this.grupo.usuarioRegistro = this.objUsuario;
    console.log(">>> registra [inicio] " + this.grupo);
    console.log(this.grupo);

    this.grupoService.actualizarCrud(this.grupo).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje });
        this.grupo = {
          descripcion: "",
          ubigeo: {
            idUbigeo: -1,
            departamento: "-1",
            provincia: "-1",
            distrito: "",
          },
          usuarioLider: {
            idUsuario: -1
          },
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

  validaDescripcion(control: FormControl) {
    console.log(">>> validaDescripcion [inicio] " + control.value);

    return this.grupoService.validaDescripcionRegistra(control.value).pipe(
      map((resp: any) => {
        console.log(">>> validaDescripcion [resp] " + resp.valid);
        return resp.valid ? null : { existeDescripcion: true };
      })
    );
  }

  listaProvincia() {
    if (this.grupo.ubigeo?.departamento && this.grupo.ubigeo.departamento !== "-1") {
      console.log("listaProvincia>>> " + this.grupo.ubigeo?.departamento);
      this.utilService.listaProvincias(this.grupo.ubigeo?.departamento).subscribe(
        x => this.provincias = x
      );
    }
  }

  listaDistrito() {
    if (this.grupo.ubigeo?.departamento && this.grupo.ubigeo.departamento !== "-1" && this.grupo.ubigeo?.provincia && this.grupo.ubigeo.provincia !== "-1") {
      console.log("listaDistrito>>> " + this.grupo.ubigeo?.departamento);
      console.log("listaDistrito>>> " + this.grupo.ubigeo?.provincia);
      this.utilService.listaDistritos(this.grupo.ubigeo?.departamento, this.grupo.ubigeo?.provincia).subscribe(
        x => this.distritos = x
      );
    }
  }

  salir() {
    
  }
}
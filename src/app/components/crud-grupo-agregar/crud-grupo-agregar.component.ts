import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Grupo } from '../../models/grupo.model';
import { Ubigeo } from '../../models/ubigeo.model';
import { Usuario } from '../../models/usuario.model';
import { GrupoService } from '../../services/grupo.service';
import { TokenService } from '../../security/token.service';
import { UtilService } from '../../services/util.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-crud-grupo-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-grupo-agregar.component.html',
  styleUrl: './crud-grupo-agregar.component.css'
})
export class CrudGrupoAgregarComponent implements OnInit {
   
  grupo: Grupo = {
    descripcion: "",
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    },
    usuarioLider: {
      idUsuario: -1 // Arreglé el valor inicial de idUsuario
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
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private utilService: UtilService
  ) {
    console.log(">>> constructor >>> ");
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.utilService.listarDepartamento().subscribe(
      x => this.departamentos = x
    );
    this.utilService.listaJefePrestamistaTotales().subscribe(
      x => this.lstPrestamistasTotales = x
    );
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit >>> " + this.departamentos);
  }

  registrar() {
    console.log(">>> registra [inicio]");
    this.grupo.usuarioActualiza = this.objUsuario;
    this.grupo.usuarioRegistro = this.objUsuario;
    console.log(">>> registra [inicio] " + this.grupo);
    console.log(this.grupo);

    this.grupoService.registrar(this.grupo).subscribe(
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
    console.log("listaProvincia>>> " + this.grupo.ubigeo?.departamento);
    this.utilService.listaProvincias(this.grupo.ubigeo?.departamento).subscribe(
      x => this.provincias = x
    );
  }

  listaDistrito() {
    console.log("listaDistrito>>> " + this.grupo.ubigeo?.departamento);
    console.log("listaDistrito>>> " + this.grupo.ubigeo?.provincia);
    this.utilService.listaDistritos(this.grupo.ubigeo?.departamento, this.grupo.ubigeo?.provincia).subscribe(
      x => this.distritos = x
    );
  }
  salir() {

  }
}

import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'

import { Ejemplo } from '../../models/ejemplo.model';
import { Pais } from '../../models/pais.model';
import { Usuario } from '../../models/usuario.model';
import { EjemploService } from '../../services/ejemplo.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, Form, FormControl } from '@angular/forms';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { map } from 'rxjs';
import { Ubigeo } from '../../models/ubigeo.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';

@Component({
  selector: 'app-agregar-ejemplo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-ejemplo.component.html',
  styleUrls: ['./agregar-ejemplo.component.css']
})
export class AgregarEjemploComponent {

  ejemplo: Ejemplo ={
      descripcion: "",
      pais:{
          idPais:-1
      },
      ubigeo:{
          idUbigeo:-1,
          departamento:"-1",
          provincia:"-1",
          distrito:"",
      },
      longitud :0,
      dias: {
          idDataCatalogo: -1,
      },
      usuarioPrestatario: {
          idUsuario: -1
      },
      usuarioRegistro: {
          idUsuario: -1
      },
      usuarioActualiza: {
          idUsuario: -1
      },  
  }
  
    formRegistrar = this.formBuilder.group({
      validaDescripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')], this.validaDescripcion.bind(this)],
      validaLongitud: ['', [Validators.required,Validators.min(1)]],
      validaPais: ['', [Validators.min(1)]],
      validaDepartamento: ['', [Validators.min(1)]],
      validaProvincia: ['', [Validators.min(1)]],
      validaDistrito: ['', [Validators.min(1)]],
      validaDias: ['', [Validators.min(1)]],
      validaPrestatario: ['', [Validators.min(1)]],
  });


  //listas de ubigeo 
  departamentos : string[] = [];
  provincias : string[] = [];
  distritos: Ubigeo[] = [];
  
  //lista de paises
  lstPais: Pais[] = [];

  //lista de días
  lstDias : DataCatalogo[] = [];

  //lista de usuarios prestarios
  lstPrestatarios: Usuario[] = [];
  
  //usuario en sesion
  objUsuario: Usuario = {};

  constructor(private ejemploService: EjemploService,
            private utilService: UtilService,
            private tokenService: TokenService,
            private formBuilder: FormBuilder) {
        console.log(">>> constructor  >>> ");
   }
    ngOnInit() {
              console.log(">>> OnInit [inicio]");
        this.utilService.listaPais().subscribe(
              x => this.lstPais = x
        );
        this.utilService.listarDepartamento().subscribe(
              x => this.departamentos = x
        );
        this.utilService.listaDiasPrestamo().subscribe(
                  x => this.lstDias = x
        );
        this.utilService.listaPrestamistariosDeUnPrestamista(this.tokenService.getUserId()).subscribe(
                  x => this.lstPrestatarios = x
      );
        this.objUsuario.idUsuario = this.tokenService.getUserId();
        console.log(">>> OnInit >>> 1 >> " + this.lstPais.length);
        console.log(">>> OnInit >>> " + this.departamentos);
        console.log(">>> OnInit >>> " + this.lstDias);
        console.log(">>> OnInit >>> " + this.lstPrestatarios);
        console.log(">>> OnInit [fin]");      
    }

  registra() {
        console.log(">>> registra [inicio]");
        this.ejemplo.usuarioActualiza = this.objUsuario;
        this.ejemplo.usuarioRegistro = this.objUsuario;
        console.log(">>> registra [inicio] " + this.ejemplo);
        console.log(this.ejemplo);


        this.ejemploService.registrar(this.ejemplo).subscribe(
          x=>{
                Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
                this.ejemplo ={
                        descripcion: "",
                        pais:{
                            idPais:-1
                        },
                        ubigeo:{
                            idUbigeo:-1,
                            departamento:"-1",
                            provincia:"-1",
                            distrito:"",
                        },
                        longitud :0,
                        dias: {
                            idDataCatalogo: -1,
                        },
                        usuarioPrestatario: {
                            idUsuario: -1
                        },
                        usuarioRegistro: {
                            idUsuario: -1
                        },
                        usuarioActualiza: {
                            idUsuario: -1
                        },  
                    }
            }
        );
   }

  validaDescripcion(control: FormControl) {
    console.log(">>> validaDescripcion [inicio] " + control.value);
    
     return this.ejemploService.validaDescripcionRegistra(control.value).pipe(
       map((resp: any) => { 
            console.log(">>> validaDescripcion [resp] " + resp.valid);
            return (resp.valid) ? null : {existeDescripcion: true} ;    
          })
      );
  }
  
   listaProvincia(){
    console.log("listaProvincia>>> " + this.ejemplo.ubigeo?.departamento);
    this.utilService.listaProvincias(this.ejemplo.ubigeo?.departamento).subscribe(
        x => this.provincias = x
    );
}

  listaDistrito(){
    console.log("listaDistrito>>> " + this.ejemplo.ubigeo?.departamento);
    console.log("listaDistrito>>> " + this.ejemplo.ubigeo?.provincia);
    this.utilService.listaDistritos(this.ejemplo.ubigeo?.departamento,this.ejemplo.ubigeo?.provincia).subscribe(
        x => this.distritos = x
    );
  }

}

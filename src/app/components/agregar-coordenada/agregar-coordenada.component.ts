import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Coordenada } from '../../models/coordenada.model';
import { Ubigeo } from '../../models/ubigeo.model';
import { Usuario } from '../../models/usuario.model';
import { CoordenadaService } from '../../services/coordenada.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-agregar-coordenada',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-coordenada.component.html',
  styleUrl: './agregar-coordenada.component.css'
})
export class AgregarCoordenadaComponent {
  coordenada: Coordenada = {
    prestatario: {
      idUsuario: -1
    },
    longitud: undefined,
    latitud: undefined,
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "-1"
    },
    usuarioRegistro: {
      idUsuario: -1
    },
    usuarioActualiza: {
      idUsuario: -1
    }
  }

  formRegistrar = this.formBuilder.group({
    validaPrestatario: ['', [Validators.required, Validators.min(1)], this.validaPrestatario.bind(this)],
    validaLongitud: ['', [Validators.required, Validators.pattern('(([0-9]{1,})|([0-9]{1,}[.][0-9]{1,3}))')]],
    validaLatitud: ['', [Validators.required, Validators.pattern('(([0-9]{1,})|([0-9]{1,}[.][0-9]{1,3}))')]],
    validaDepartamento: ['', [Validators.required, Validators.min(1)]],
    validaProvincia: ['', [Validators.required, Validators.min(1)]],
    validaDistrito: ['', [Validators.required, Validators.min(1)]]
  })

  prestatarios: Usuario[] = [];

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  objUsuario: Usuario = {};

  constructor(private coordenadaService: CoordenadaService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) {
    console.log(">>> constructor  >>> " + this.tokenService.getUserId());

    this.utilService.listaPrestamistariosDeUnPrestamista(this.tokenService.getUserId()).subscribe(
      x => {
        console.log(">>> ZZZZ");
        console.log(x);
        this.prestatarios = x;
      }
    )

    console.log(">>> constructor 22222>>> " + this.prestatarios);
  }

  ngOnInit() {
    console.log(">>> OnInit [inicio]");
    this.utilService.listarDepartamento().subscribe(
      x => this.departamentos = x
    );
    this.utilService.listaPrestamistariosDeUnPrestamista(this.tokenService.getUserId()).subscribe(
      x => {
        console.log(">>> XXXX");
        console.log(x);
        this.prestatarios = x;
      }
    )
    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit >>> " + this.departamentos);
    console.log(">>> OnInit >>> " + this.prestatarios);
    console.log(">>> OnInit [fin]");
  }

  registra() {
    console.log(">>> registra [inicio]");
    this.coordenada.usuarioActualiza = this.objUsuario;
    this.coordenada.usuarioRegistro = this.objUsuario;
    console.log(">>> registra [inicio] " + this.coordenada);
    console.log(this.coordenada);

    this.coordenadaService.registrar(this.coordenada).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje });
        this.coordenada = {
          latitud: 0,
          longitud: 0,
          prestatario: {
            idUsuario: -1
          },
          ubigeo: {
            idUbigeo: -1,
            departamento: "-1",
            provincia: "-1",
            distrito: "-1"
          },
          usuarioRegistro: {
            idUsuario: -1
          },
          usuarioActualiza: {
            idUsuario: -1
          }
        }
      }
    );
  }

  validaPrestatario(control: FormControl) {
    console.log(">>> validaPrestatario [inicio] " + control.value);

    return this.coordenadaService.validaPrestatarioRegistra(control.value).pipe(
      map((resp: any) => {
        console.log(">>> validaPrestatario [resp] " + resp.valid);
        return (resp.valid) ? null : { existePrestatario: true };
      })
    );
  }

  listaProvincia() {
    console.log("listaDepartamento >>> " + this.coordenada.ubigeo?.departamento);
    this.utilService.listaProvincias(this.coordenada.ubigeo?.departamento).subscribe(
      x => this.provincias = x
    );
  }

  listaDistrito() {
    console.log("listaDistrito >>> " + this.coordenada.ubigeo?.departamento);
    console.log("listaDistrito >>> " + this.coordenada.ubigeo?.provincia);
    this.utilService.listaDistritos(this.coordenada.ubigeo?.departamento, this.coordenada.ubigeo?.provincia).subscribe(
      x => this.distritos = x
    );
  }
}

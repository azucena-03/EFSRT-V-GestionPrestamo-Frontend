import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Catalogo } from '../../models/catalogo.model';
import { Usuario } from '../../models/usuario.model';
import { DataCatalogoService } from '../../services/data-catalogo.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-crud-data-catalogo-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-data-catalogo-agregar.component.html',
  styleUrl: './crud-data-catalogo-agregar.component.css'
})

export class CrudDataCatalogoAgregarComponent {
  dataCatalogo: DataCatalogo = {
    descripcion: "",
    catalogo: {
      idCatalogo: -1
    },
    estado: 0
  };

  formRegistrar = this.formBuilder.group({
    validaDescripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')], this.validaDescripcion.bind(this)],
    validaCatalogo: ['', [Validators.min(1)]]
  });

  lstCatalogo: Catalogo[] = [];
  objUsuario: Usuario = {};

  constructor(
    private dataCatalogoService: DataCatalogoService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    console.log(">>> constructor  >>> ");
  }

  ngOnInit() {
    this.dataCatalogoService.listaCatalogo().subscribe(
      x => {
        this.lstCatalogo = x;
        console.log("> onInit >> 1 >>", this.lstCatalogo.length);
      }
    );
    this.objUsuario.idUsuario = this.tokenService.getUserId();
  }

registrar(){
    this.dataCatalogoService.registrarCrud(this.dataCatalogo).subscribe(
      x => {
        Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
        this.dataCatalogo = {
          descripcion: "",
          catalogo: {
          idCatalogo: -1
          },
          estado: 0
        }
      }
    )
}

onCheckboxChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  this.dataCatalogo.estado = inputElement.checked ? 1 : 0;
}



  validaDescripcion(control: FormControl) {
    console.log(">>> validaDescripcion [inicio] " + control.value);

    return this.dataCatalogoService.validaDescripcionRegistra(control.value).pipe(
      map((resp: any) => {
        console.log(">>> validaDescripcion [resp] " + resp.valid);
        return (resp.valid) ? null : { existeDescripcion: true };
      })
    );
  }

  salir(){
    
  }

}

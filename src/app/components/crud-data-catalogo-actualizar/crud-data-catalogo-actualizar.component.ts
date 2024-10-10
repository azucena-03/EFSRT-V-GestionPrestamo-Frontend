import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { DataCatalogoService } from '../../services/data-catalogo.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Catalogo } from '../../models/catalogo.model';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-crud-data-catalogo-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-data-catalogo-actualizar.component.html',
  styleUrl: './crud-data-catalogo-actualizar.component.css'
})
export class CrudDataCatalogoActualizarComponent {

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
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DataCatalogo) {
            
      //Pasar el objeto a la variable
      this.dataCatalogo = data;

   {
    console.log(">>> constructor  >>> ");
  }
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

    actualizar(){
      this.dataCatalogoService.actualizarCrud(this.dataCatalogo).subscribe(
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

  validaDescripcion(control: FormControl) {
    console.log(">>> validaDescripcion [inicio] " + control.value);
    return this.dataCatalogoService.vlidaDescripcionActualiza(control.value, this.dataCatalogo.idDataCatalogo || 0).pipe(
       map((resp: any) => { 
            console.log(">>> validaDescripcion [resp] " + resp.valid);
            return (resp.valid) ? null : {existeDescripcion: true} ;    
          })
      );
  }
  
  onCheckboxChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dataCatalogo.estado = inputElement.checked ? 1 : 0;
  }


  salir(){
    
  }




}

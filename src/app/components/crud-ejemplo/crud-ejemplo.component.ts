import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { Ejemplo } from '../../models/ejemplo.model';
import { EjemploService } from '../../services/ejemplo.service';
import { TokenService } from '../../security/token.service';
import { MatTableDataSource } from '@angular/material/table';
import { CrudEjemploAgregarComponent } from '../crud-ejemplo-agregar/crud-ejemplo-agregar.component';
import { CrudEjemploActualizarComponent } from '../crud-ejemplo-actualizar/crud-ejemplo-actualizar.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crud-ejemplo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-ejemplo.component.html',
  styleUrl: './crud-ejemplo.component.css'
})
export class CrudEjemploComponent {

    //Datos para la Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera
    displayedColumns = ["idEjemplo","descripcion","dias","longitud","pais","ubigeo","estado", "acciones"];

    //filtro de la consulta
    filtro: string = "";
  
    objUsuario: Usuario = {} ;
    
    constructor(private dialogService: MatDialog, 
                private ejemploService: EjemploService,
                private tokenService: TokenService ){
        this.objUsuario.idUsuario = tokenService.getUserId();
    }

  openDialogRegistrar() {
      console.log(">>> openDialogRegistrar [ini]");
      const dialogRef = this.dialogService.open(CrudEjemploAgregarComponent);
      dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed with result:', result);
            if (result != null && result === 1) {
              this.refreshTable();
            }
      });
      console.log(">>> openDialogRegistrar [fin]");
    }
  
    openDialogActualizar(obj: Ejemplo) {
      console.log(">>> openDialogActualizar [ini]");
      console.log("obj: ", obj);
      const dialogRef = this.dialogService.open(CrudEjemploActualizarComponent, {data: obj} );
      dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed with result:', result);
          if (result != null && (result === 1 || result === 2)) {
                this.refreshTable();
          }
      });
      console.log(">>> openDialogActualizar [fin]");
    }

    refreshTable(){
        console.log(">>> refreshTable [ini]");
        var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
        this.ejemploService.consultarCrud(msgFiltro).subscribe(
              x => {
                this.dataSource = new MatTableDataSource<Ejemplo>(x);
                this.dataSource.paginator = this.paginator
              }
        );

        console.log(">>> refreshTable [fin]");
    }

  updateEstado(obj:Ejemplo) {
      console.log(">>> updateEstado [ini]");
      console.log("obj: ", obj);
      obj.estado = obj.estado == 1 ? 0 : 1;
      this.ejemploService.actualizarCrud(obj).subscribe(
          x => {
              this.refreshTable();
          }
      );
       console.log(">>> updateEstado [fin]");
  }
  
  delete(obj: Ejemplo) {
      Swal.fire({
        title: '¿Desea eliminar?',
        text: "Los cambios no se van a revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimina',
        cancelButtonText: 'No, cancelar'
        }).then((result) => {
              if (result.isConfirmed) {
                  this.ejemploService.eliminarCrud(obj.idEjemplo || 0).subscribe(
                        x => {
                              this.refreshTable();
                              Swal.fire('Mensaje', x.mensaje, 'info');
                        }
                  );
              }
        })   
  }

}

import { DataCatalogoService } from './../../services/data-catalogo.service';
import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../security/token.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MontoPrestamoService } from '../../services/monto-prestamo.service';
import { CrudMontoPrestamoAgregarComponent } from '../crud-monto-prestamo-agregar/crud-monto-prestamo-agregar.component';
import { MontoPrestamo } from '../../models/monto-prestamo.model';
import { CrudMontoPrestamoActualizarComponent } from '../crud-monto-prestamo-actualizar/crud-monto-prestamo-actualizar.component';
import { UtilService } from '../../services/util.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';

@Component({
  selector: 'app-crud-monto-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-monto-prestamo.component.html',
  styleUrl: './crud-monto-prestamo.component.css'
})

export class CrudMontoPrestamoComponent {
  //Datos para la Grila
  dataSource:any;

  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idMontoPrestamo","capital","dias","monto","estado", "acciones"];

  //filtro de la consulta
  filtro: string = "";


  objUsuario: Usuario = {} ;

  constructor(private dialogService: MatDialog,
            private montoService: MontoPrestamoService,
            private utilService: UtilService,
            private tokenService: TokenService ){
    this.objUsuario.idUsuario = tokenService.getUserId();
  }


  openDialogRegistrar() {
  console.log(">>> openDialogRegistrar [ini]");
  const dialogRef = this.dialogService.open(CrudMontoPrestamoAgregarComponent);
  dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && result === 1) {
          this.refreshTable();
        }
  });
  console.log(">>> openDialogRegistrar [fin]");
  }

  openDialogActualizar(obj: MontoPrestamo) {
  console.log(">>> openDialogActualizar [ini]");
  console.log("obj: ", obj);
  const dialogRef = this.dialogService.open(CrudMontoPrestamoActualizarComponent, {data: obj} );
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
    this.montoService.consultarCrud(msgFiltro).subscribe(
          x => {
            this.dataSource = new MatTableDataSource<MontoPrestamo>(x);
            this.dataSource.paginator = this.paginator
          }
    );

    console.log(">>> refreshTable [fin]");
  }

  updateEstado(obj:MontoPrestamo) {
  console.log(">>> updateEstado [ini]");
  console.log("obj: ", obj);
  obj.estado = obj.estado == 1 ? 0 : 1;
  this.montoService.actualizarCrud(obj).subscribe(
      x => {
          this.refreshTable();
      }
  );
   console.log(">>> updateEstado [fin]");
  }

  delete(obj: MontoPrestamo) {
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
            this.montoService.eliminarCrud(obj.idMontoPrestamo || 0).subscribe(
                  x => {
                     this.refreshTable();
                     Swal.fire('Mensaje', x.mensaje, 'info');
                  }
            );
          }
        })
       }
  }             

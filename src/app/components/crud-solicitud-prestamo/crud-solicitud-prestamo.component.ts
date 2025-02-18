import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app.material.module';
import { MatDialog } from '@angular/material/dialog';
import { PrestamoService } from '../../services/solicitud-prestamo.service';
import { CrudSolicitudPrestamoAgregarComponent } from '../crud-solicitud-prestamo-agregar/crud-solicitud-prestamo-agregar.component';
import { SolicitudPrestamo } from '../../models/solicitud-prestamo.model';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CrudSolicitudPrestamoActualizarComponent } from '../crud-solicitud-prestamo-actualizar/crud-solicitud-prestamo-actualizar.component';

@Component({
  selector: 'app-crud-solicitud-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './crud-solicitud-prestamo.component.html',
  styleUrl: './crud-solicitud-prestamo.component.css',
})
export class CrudSolicitudPrestamoComponent {
  fechaInicio: Date = new Date('01-01-1900');
  fechaFin: Date = new Date();
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = [
    'idSolicitud',
    'capital',
    'dias',
    'montoPagar',
    'fechaInicioPrestamo',
    'fechaFinPrestamo',
    'acciones',
  ];
  filtro: string = '';
  constructor(
    private dialogService: MatDialog,
    private prestamoService: PrestamoService
  ) {}
  refreshTable() {
    console.log('>>> refreshTable [ini]');
    this.prestamoService.obtenerPrestamos().subscribe((x) => {
      this.dataSource = new MatTableDataSource<SolicitudPrestamo>(x);
      this.dataSource.paginator = this.paginator;
    });
    console.log('>>> refreshTable [fin]');
  }

  consulta() {
    console.log('>>> consulta [ini]');
    this.prestamoService
      .obtenerPrestamosPorFecha(
        this.fechaInicio.toISOString(),
        this.fechaFin.toISOString()
      )
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource<SolicitudPrestamo>(x);
        this.dataSource.paginator = this.paginator;
      });
  }

  openUpdateDialog(obj: SolicitudPrestamo) {
    console.log('>>> openUpdateDialog [ini]');
    const dialogo = this.dialogService.open(
      CrudSolicitudPrestamoActualizarComponent,
      {
        data: obj,
      }
    );
    dialogo.afterClosed().subscribe((x) => {
      console.log('>>> x >> ' + x);
      if (x === 1) {
        this.refreshTable();
      }
    });
    console.log('>>> openUpdateDialog [fin]');
  }
  elimina(obj: SolicitudPrestamo) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: 'Los cambios no se van a revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.prestamoService
          .eliminarCrud(obj.idSolicitud || 0)
          .subscribe((x) => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          });
      }
    });
  }
}

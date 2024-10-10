import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { CoordenadaService } from '../../services/coordenada.service';
import { TokenService } from '../../security/token.service';
import { CrudCoordenadaAgregarComponent } from '../crud-coordenada-agregar/crud-coordenada-agregar.component';
import { Coordenada } from '../../models/coordenada.model';
import { CrudCoordenadaActualizarComponent } from '../crud-coordenada-actualizar/crud-coordenada-actualizar.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-coordenada',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-coordenada.component.html',
  styleUrl: './crud-coordenada.component.css'
})
export class CrudCoordenadaComponent {
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["idCoordenada", "latitud", "longitud", "prestatario", "ubigeo", "estado", "acciones"];

  filtro: string = "";

  objUsuario: Usuario = {};

  constructor(private dialogService: MatDialog,
    private coordenadaService: CoordenadaService,
    private tokenService: TokenService) {
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  openDialogRegistrar() {
    console.log(">>> openDialogRegistrar [ini]");
    const dialogRef = this.dialogService.open(CrudCoordenadaAgregarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result: ', result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogRegistrar [fin]");
  }

  openDialogActualizar(obj: Coordenada) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("obj: ", obj);
    const dialogRef = this.dialogService.open(CrudCoordenadaActualizarComponent, { data: obj });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result: ', result);
      if (result != null && (result === 1 || result === 2)) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogActualizar [fin]");
  }

  refreshTable() {
    console.log(">>> refreshTable [ini]");
    var msgFiltro = this.filtro == "" ? "todos" : this.filtro;
    this.coordenadaService.consultarCrud(msgFiltro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Coordenada>(x);
        this.dataSource.paginator = this.paginator
      }
    );
    console.log(">>> refreshTable [fin]");
  }

  updateEstado(obj: Coordenada) {
    console.log(">>> updateEstado [ini]");
    console.log("obj: ", obj);
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.coordenadaService.actualizarCrud(obj).subscribe(
      x => {
        this.refreshTable();
      }
    );
    console.log(">>> updateEstado [fin]");
  }

  delete(obj: Coordenada) {
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
        this.coordenadaService.eliminarCrud(obj.idCoordenada || 0).subscribe(
          x => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          }
        );
      }
    })
  }
}

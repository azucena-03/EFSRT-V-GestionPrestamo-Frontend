import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { Cuenta } from '../../models/cuenta.model';
import { CuentaService } from '../../services/cuenta.service';
import { TokenService } from '../../security/token.service';
import { CrudCuentaAgregarComponent } from '../crud-cuenta-agregar/crud-cuenta-agregar.component';
import { MatTableDataSource } from '@angular/material/table';
import { CrudCuentaActualizarComponent } from '../crud-cuenta-actualizar/crud-cuenta-actualizar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-cuenta',
  standalone: true,
  imports:  [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-cuenta.component.html',
  styleUrl: './crud-cuenta.component.css'
})
export class CrudCuentaComponent {

  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["idCuenta", "numero", "tipofinan","entidadFinancieraa", "tipoMonedaa","estado", "acciones"];

  filtro: string = "";

  objUsuario: Usuario = {};

  constructor
  (
    private dialogService: MatDialog,
    private cuentaService: CuentaService,
    private tokenService: TokenService
  ) {
    this.objUsuario.idUsuario = tokenService.getUserId();
  } 

  openDialogRegistrar() {
    console.log(">>> openDialogRegistrar [ini]");
    const dialogRef = this.dialogService.open(CrudCuentaAgregarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: "+result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogRegistrar [fin]");
  }

  openDialogActualizar(obj: Cuenta) {
    console.log(">>> openDialogActualizar [ini]");
    console.log("Objeto Cuenta:", obj);

    const dialogRef = this.dialogService.open(CrudCuentaActualizarComponent, {data: obj} );
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: "+result);
      if (result != null && result === 1) {
        this.refreshTable();
      }
    });
    console.log(">>> openDialogActualizar [fin]");
  }

  refreshTable() {
    console.log(">>> refreshTable [ini]");
    var msgFiltro = this.filtro == "" ? "todos": this.filtro;
    this.cuentaService.consultarCrud(msgFiltro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Cuenta>(x);//(x.filter((x: Cuenta) => x.estado == 1));
        this.dataSource.paginator = this.paginator;
        //imprimir la data en consola
        console.log(">>> data" + this.dataSource.data);
        //traer los de estado =1
      }
    );

    console.log(">>> refreshTable [fin]");
  }

  filterStatus() {
    console.log(">>> refreshTable [ini]");
    var msgFiltro = this.filtro == "" ? "todos": this.filtro;
    this.cuentaService.consultarCrud(msgFiltro).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Cuenta>(x.filter((x: Cuenta) => x.estado == 1));
        this.dataSource.paginator = this.paginator;
        //imprimir la data en consola
        console.log(">>> data" + this.dataSource.data);
        //traer los de estado =1
      }
    );

    console.log(">>> refreshTable [fin]");
  }

  updateEstado(obj: Cuenta) {
    console.log(">>> updateEstado [ini]");
    console.log("obj: ", obj);
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.cuentaService.actualizarCrud(obj).subscribe(
      x => {
        this.refreshTable();
      }
    );
    console.log(">>> updateEstado [fin]");
  }	

  delete(obj: Cuenta) {
  Swal.fire({
    title: '¿Está seguro de eliminar el registro?',
    text: "No podrá revertir esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cuentaService.eliminarCrud(obj.idCuenta || 0).subscribe(
        x => {
          this.refreshTable();
          Swal.fire('Mensaje', x.mensaje, 'info')
        }
      );
    }
  });

  }

}

import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { DataCatalogoService } from '../../services/data-catalogo.service';
import { TokenService } from '../../security/token.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatTableDataSource } from '@angular/material/table';
import { CrudDataCatalogoActualizarComponent } from '../crud-data-catalogo-actualizar/crud-data-catalogo-actualizar.component';
import { CrudDataCatalogoAgregarComponent } from '../crud-data-catalogo-agregar/crud-data-catalogo-agregar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-data-catalogo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-data-catalogo.component.html',
  styleUrl: './crud-data-catalogo.component.css'
})

export class CrudDataCatalogoComponent {
  dataSource:any;

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["idDataCatalogo","descripcion","idCatalogo","estado","acciones"];

  filtro: string = "";

  objUsuario: Usuario = {} ;

  constructor(private dialogService: MatDialog,  
    private dataCatalogoService: DataCatalogoService,
    private tokenService: TokenService ){
this.objUsuario.idUsuario = tokenService.getUserId();
}

openDialogRegistrar() {
  console.log(">>> openDialogRegistrar [ini]");
  const dialogRef = this.dialogService.open(CrudDataCatalogoAgregarComponent);
  dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && result === 1) {
          this.refreshTable();
        }
  });
  console.log(">>> openDialogRegistrar [fin]");
}
openDialogActualizar(obj: DataCatalogo) {
  console.log(">>> openDialogActualizar [ini]");
  console.log("obj: ", obj);
  const dialogRef = this.dialogService.open(CrudDataCatalogoActualizarComponent, {data: obj} );
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
  this.dataCatalogoService.consultarCrud(msgFiltro).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<DataCatalogo>(x);
          this.dataSource.paginator = this.paginator
        }
  );

  console.log(">>> refreshTable [fin]");
}

updateEstado(obj:DataCatalogo) {
  console.log(">>> updateEstado [ini]");
  console.log("obj: ", obj);
  obj.estado = obj.estado == 1 ? 0 : 1;
  this.dataCatalogoService.actualizarCrud(obj).subscribe(
      x => {
          this.refreshTable();
      }
  );
   console.log(">>> updateEstado [fin]");
}

delete(obj: DataCatalogo) {
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
              this.dataCatalogoService.eliminarCrud(obj.idDataCatalogo || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })   
}

}

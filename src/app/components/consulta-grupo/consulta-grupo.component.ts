import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Ubigeo } from '../../models/ubigeo.model';
import { Usuario } from '../../models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';
import { GrupoService } from '../../services/grupo.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-consulta-grupo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-grupo.component.html',
  styleUrl: './consulta-grupo.component.css'
})
export class ConsultaGrupoComponent {

  
// Listas para los combos
lstLider: Usuario[] = [];

// Filtro de la consulta
descripcion: string = "";
idUsuarioLider: string = "-1";
estado: boolean = true;

// Datos para la Grilla
dataSource: any;

// Clase para la paginacion
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

// Cabecera
displayedColumns = ["idGrupo", "descripcion", "usuarioLider", "estado", "fechaRegistro", "fechaActualizacion"];

constructor(private grupoService: GrupoService,
            private utilService: UtilService) { }

ngOnInit() {
  console.log(">>> ngOnInit [ini]");
  this.utilService.listaJefePrestamistaTotales().subscribe(
    data => { this.lstLider = data; }
  );
  console.log(">>> ngOnInit [fin]");
}

consultar() {
  console.log(">>> consultar [ini]");
  console.log("descripcion: ", this.descripcion);
  console.log("idUsuarioLider: ", this.idUsuarioLider);
  console.log("estado: ", this.estado);

  this.grupoService.consultaGrupo(this.descripcion,
    this.idUsuarioLider,
    this.estado ? 1 : 0).subscribe(
    data => {
      this.dataSource = data;
      this.dataSource.paginator = this.paginator;
    }
  );
  console.log(">>> consultar [fin]");
}


}

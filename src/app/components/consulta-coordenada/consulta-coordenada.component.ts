import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { CoordenadaService } from '../../services/coordenada.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-consulta-coordenada',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-coordenada.component.html',
  styleUrl: './consulta-coordenada.component.css'
})
export class ConsultaCoordenadaComponent {

  latitud: string = "";
  longitud: string = "";
  estado: boolean = true;

  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["idCoordenada", "latitud", "longitud", "prestatario", "ubigeo", "estado"];

  constructor(private coordenadaService: CoordenadaService, private utilService: UtilService) {

  }

  consultar() {
    console.log(">>> consultar [ini]");
    console.log("latitd: " + this.latitud);
    console.log("longitud: " + this.longitud);
    console.log("estado: " + this.estado);

    this.coordenadaService.consultaCoordenada(
      this.latitud === "" ? -1 : parseFloat(this.latitud),
      this.longitud === "" ? -1 : parseFloat(this.longitud),
      this.estado ? 1 : 0).subscribe(
        data => {
          this.dataSource = data;
          this.dataSource.paginator = this.paginator;
        }
      );
      console.log(">>> consultar [fin]")
  }
}

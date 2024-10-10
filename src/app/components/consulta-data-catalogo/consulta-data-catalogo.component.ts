import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';
import { Catalogo } from '../../models/catalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogoService } from '../../services/data-catalogo.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-consulta-data-catalogo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-data-catalogo.component.html',
  styleUrl: './consulta-data-catalogo.component.css'
})
export class ConsultaDataCatalogoComponent {

  lstCatalogo: Catalogo[] = [];


  descripcion: string = "";
  idCatalogo: string="-1";
  estado: boolean = true;

  dataSource:any;

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["idDataCatalogo","descripcion","idCatalogo","estado"];

  constructor(
    private dataCatalogoService : DataCatalogoService ,
    private utilService: UtilService
  ){
  }
  
  ngOnInit() {
    console.log(">>> ngOnInit [ini]");
    this.dataCatalogoService.listaCatalogo().subscribe(
      data => { this.lstCatalogo = data; }
    );
    console.log(">>> ngOnInit [fin]");
}

consultar() {
  console.log(">>> consultar [ini]");
  console.log("descripcion: ", this.descripcion);
  console.log("idCatalogo: ", this.idCatalogo);
  console.log("estado: ", this.estado);


  this.dataCatalogoService.consultaCuenta(
    this.descripcion,
    this.idCatalogo,
    this.estado ? 1 : 0).subscribe(
    data => {
      this.dataSource = data;
      this.dataSource.paginator = this.paginator;
    }
  );
  console.log(">>> consultar [fin]");
}
}

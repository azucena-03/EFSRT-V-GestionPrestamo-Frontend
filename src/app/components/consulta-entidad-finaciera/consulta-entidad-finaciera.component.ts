import { Component, ViewChild } from "@angular/core";
import { AppMaterialModule } from "../../app.material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "../../menu/menu.component";
import { MatPaginator } from "@angular/material/paginator";
import { DataCatalogo } from "../../models/dataCatalogo.model";
import { EntidadFinancieraService } from "../../services/entidad-financiera.service";
import { UtilService } from "../../services/util.service";
import { MatTableDataSource } from "@angular/material/table";
import { EntidadFinanciera } from "../../models/entidad-financiera.model";


@Component({
  selector: 'app-consulta-entidad-finaciera',
  standalone: true,
  imports: [AppMaterialModule,
    FormsModule,
    CommonModule,
    MenuComponent,
    ReactiveFormsModule],
  templateUrl: './consulta-entidad-finaciera.component.html',
  styleUrl: './consulta-entidad-finaciera.component.css'
})
export class ConsultaEntidadFinacieraComponent {

  dataSource: any;

  //Clase para la paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = [
    'idEntidadFinanciera',
    'nombre',
    'gerente',
    'tipoEntidad',
    'estado',
  ];

  lstTipoEntidad:DataCatalogo[] =[];

  nombre: string="";
  gerente: string="";
  tipoEntidad: string="-1";
  estado: boolean=true;

  constructor(private entidadFinancieraService:EntidadFinancieraService,
    private utilService:UtilService){
  }

  ngOnInit() {
    console.log('>>> OnInit [inicio]');
    this.utilService.listaTipoEntidadBancaria().subscribe(
      (x) => (this.lstTipoEntidad = x)
    );
  }

  consultar(){

    console.log(">>> consultar [ini]");
    console.log("nombre: " + this.nombre);
    console.log("gerente: " + this.gerente);
    console.log("idEntidadFinanciera: " + this.tipoEntidad);
    console.log("estado: " + this.estado);
    this.entidadFinancieraService.consultaFinanciera(

      this.nombre,
      this.gerente,
      this.tipoEntidad,
      this.estado ?1 : 0).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<EntidadFinanciera>(data);
        this.dataSource.paginator = this.paginator;
      }
    );
    console.log(">>> consultar [fin]");
  }



}

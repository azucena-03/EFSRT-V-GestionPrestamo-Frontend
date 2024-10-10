import { Component, ViewChild, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { CuentaService } from '../../services/cuenta.service';
import { UtilService } from '../../services/util.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { EntidadFinanciera2 } from '../../models/entidad-financiera2.model';
import { MatTableDataSource } from '@angular/material/table';
import { Cuenta } from '../../models/cuenta.model';

@Component({
  selector: 'app-consulta-cuenta',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-cuenta.component.html',
  styleUrl: './consulta-cuenta.component.css'
})
export class ConsultaCuentaComponent {

  lstTipoFinanciera: DataCatalogo[] = [];
  lstTipoMoneda: DataCatalogo[] = [];
  lstEntidadesFinancieras: EntidadFinanciera2[] = [];
  

  numero:string ="";
  idTipoFinanciera:string = "-1";
  idEntidadFinanciera:string = "-1";
  estado:boolean= true;
  idTipoMoneda:string = "-1";

  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idCuenta", "numero", "tipofinan","entidadFinancieraa", "tipoMonedaa","estado"];

  constructor(private cuentaService: CuentaService,
    private utilService: UtilService
  ) {
  }

  ngOnInit() {
    console.log(">>> ngOnInit [ini]");
    this.utilService.listaTipoEntidadBancaria().subscribe(
      data => { this.lstTipoFinanciera = data; }
    );
    this.utilService.listaTipoMoneda().subscribe(
      data => { this.lstTipoMoneda = data; }
    );
    console.log(">>> ngOnInit [fin]");
  }

  consultar(){

    console.log(">>> consultar [ini]");
    console.log("numero: " + this.numero);
    console.log("idEntidadFinanciera: " + this.idEntidadFinanciera);
    console.log("estado: " + this.estado);
    console.log("idTipoMoneda: " + this.idTipoMoneda);
    console.log("idTipoFinanciera: " + this.idTipoFinanciera);
    this.cuentaService.consultaCuenta(
      this.numero,
      this.idEntidadFinanciera,
      this.estado ?1 :0,
      this.idTipoMoneda,
    this.idTipoFinanciera).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Cuenta>(data);
        this.dataSource.paginator = this.paginator;
      }
    );
    console.log(">>> consultar [fin]");
  }

  filtrarEntidades(tipoEntidadId: number) {
    // Filtrar y cargar entidades financieras basadas en el tipo de entidad seleccionado
    if (tipoEntidadId <= 0) {
      this.lstEntidadesFinancieras = [];
      return;
    }

    this.cuentaService.listaFinanciera().subscribe(
      x => {
        this.lstEntidadesFinancieras = x.filter(entidad => entidad.tipoEntidad?.idDataCatalogo === tipoEntidadId);
      }
    );
  }









}

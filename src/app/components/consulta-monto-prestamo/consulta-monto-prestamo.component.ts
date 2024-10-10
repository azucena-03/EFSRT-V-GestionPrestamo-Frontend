import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MontoPrestamoService } from '../../services/monto-prestamo.service';
import { UtilService } from '../../services/util.service';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogo } from '../../models/dataCatalogo.model';

@Component({
  selector: 'app-consulta-monto-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-monto-prestamo.component.html',
  styleUrl: './consulta-monto-prestamo.component.css'
})
export class ConsultaMontoPrestamoComponent {
//Datos para la Grila
dataSource:any;
//Clase para la paginacion
@ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
//Cabecera
displayedColumns = ["idMontoPrestamo","capital","dias","monto","estado"];

 //lista de días
 lstDias : DataCatalogo[] = [];
 capital: number=0;
 idDias: String = "-1";
 estado: boolean=true;
 monto: number=0;

constructor(
          private montoService: MontoPrestamoService,
          private utilService: UtilService,
         ){ 

}
ngOnInit() {
  console.log(">>> ngOnInit [ini]");
  this.utilService.listaDiasPrestamo().subscribe(
    data => {this.lstDias = data; }
  );
  console.log(">>> ngOnInit [fin]");
}

/*consultar() {
  console.log(">>> consultar [inicio]");
  console.log("capital: ", this.capital);
  console.log("estado: ", this.estado);
  console.log("monto: ", this.monto);
  console.log("idDias: ", this.idDias);
  
  this.montoService.consultaMonto(this.capital, this.monto, this.estado ? 1 : 0, this.idDias).subscribe(
    data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    },
  );
  
  console.log(">>> consultar [fin]");
}
*/
}
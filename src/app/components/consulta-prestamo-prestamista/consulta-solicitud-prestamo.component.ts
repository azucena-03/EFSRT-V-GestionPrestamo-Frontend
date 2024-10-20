import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { PrestamoService } from '../../services/solicitud-prestamo.service';
import { MatPaginator } from '@angular/material/paginator';
import { SolicitudPrestamo } from '../../models/solicitud-prestamo.model';
import { TokenService } from '../../security/token.service';
import * as XLSX from 'xlsx';
import { ExportarService } from '../../services/exportar.service';

@Component({
  selector: 'app-consulta-solicitud-prestamo',
  standalone: true,
  imports: [
    AppMaterialModule,
    FormsModule,
    CommonModule,
    MenuComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './consulta-solicitud-prestamo.component.html',
  styleUrl: './consulta-solicitud-prestamo.component.css',
})
export class ConsultaPrestamoPorPrestamistaComponent {
  prestamos: SolicitudPrestamo[] = [];
  prestamosFiltrados: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ['idSolicitud', 'capital', 'dias', 'estadoSolicitud'];

  constructor(
    private prestamoService: PrestamoService,
    private tokenService: TokenService,
    private exportarService: ExportarService
  ) {}

  ngOnInit() {
    this.filtrarPrestamos();
  }

  filtrarPrestamos(): void {
    const idPrestamista = this.tokenService.getUserId();
    this.prestamoService
      .obtenerPrestamosPorPrestamista(idPrestamista)
      .subscribe(
        (data) => {
          this.prestamos = data;
          console.log('Préstamos obtenidos:', this.prestamos);
        },
        (error) => {
          console.error('Error al obtener préstamos:', error);
        }
      );
  }

  filename = 'PrestamosxPrestamista.xlsx';

  exportexcel() {
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.filename);
  }

  exportpdf() {
    const encabezado = ['N° Código', 'Capital', 'Días', 'Estado Solicitud'];
    const idPrestamista = this.tokenService.getUserId();
    const nombrePrestamista = this.tokenService.getUserNameComplete();
    this.prestamoService
      .obtenerPrestamosPorPrestamista(idPrestamista)
      .subscribe((data) => {
        const cuerpo = Object(data).map((obj: any) => {
          const datos = [
            obj.idSolicitud,
            obj.capital,
            obj.dias.descripcion,
            obj.estadoSolicitud.descripcion,
          ];

          return datos;
        });
        this.exportarService.exportarpdf(
          encabezado,
          cuerpo,
          'Listado de prestamos por prestamista',
          nombrePrestamista,
          true
        );
      });
  }
}

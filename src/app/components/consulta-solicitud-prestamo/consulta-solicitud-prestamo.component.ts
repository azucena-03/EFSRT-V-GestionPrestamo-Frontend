import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { PrestamoService } from '../../services/solicitud-prestamo.service';
import { MatPaginator } from '@angular/material/paginator';

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
export class ConsultaSolicitudPrestamoComponent {
  prestamos: any[] = [];
  prestamosFiltrados: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ['idSolicitud', 'capital', 'dias', 'estadoSolicitud'];

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.prestamoService.obtenerPrestamos().subscribe((data) => {
      this.prestamos = data;
      this.prestamosFiltrados = data;
    });
  }

  filtrarPorEstado(estado: string) {
    this.prestamosFiltrados = this.prestamos.filter(
      (prestamo) => prestamo.estadoSolicitud.descripcion === estado
    );
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ExportarService {
  constructor(private http: HttpClient) {}

  filename = 'prestamosxprestamista';

  exportarpdf(
    encabezado: string[],
    cuerpo: Array<any>,
    titulo: string,
    prestamista: string,
    guardar?: boolean
  ) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter',
    });
    doc.setFontSize(12);
    doc.text(`Prestamista: ${prestamista}`, 30, 25);
    doc.setFontSize(12);
    const hoy = new Date();
    doc.text(
      `Fecha: ${hoy.getDate()} / ${hoy.getMonth() + 1} / ${hoy.getFullYear()}`,
      30,
      35
    );
    doc.addImage('assets/logo.png', 'PNG', 350, 10, 80, 20);
    doc.setFontSize(16);
    doc.text(titulo, doc.internal.pageSize.width / 2, 60, { align: 'center' });

    const startY = 75;
    autoTable(doc, {
      head: [encabezado],
      body: cuerpo,
      startY: startY,
      headStyles: {
        fillColor: [42, 104, 119],
      },
    });

    if (guardar) {
      doc.save(this.filename + '.pdf');
    } else {
    }
  }
}

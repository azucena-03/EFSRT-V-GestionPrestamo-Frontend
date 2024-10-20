import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudPrestamo } from '../models/solicitud-prestamo.model';
import { AppSettings } from '../app.settings';

const baseUrlSolicitud = AppSettings.API_ENDPOINT + '/solicitudPrestamo';
const baseUrlCrudPrestamo = AppSettings.API_ENDPOINT + '/crudPrestamo';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private apiUrl = 'http://localhost:8090/url/solicitudPrestamo';

  constructor(private http: HttpClient) {}

  obtenerPrestamos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registrar(data: SolicitudPrestamo): Observable<any> {
    return this.http.post(baseUrlSolicitud, data);
  }

  actualizarCrud(data: SolicitudPrestamo): Observable<any> {
    return this.http.put(baseUrlCrudPrestamo + '/actualizaPrestamo', data);
  }

  eliminarCrud(id: number): Observable<any> {
    return this.http.delete(baseUrlCrudPrestamo + '/eliminaPrestamo/' + id);
  }

  obtenerPrestamosPorFecha(desde: string, hasta: string): Observable<any> {
    const params = new HttpParams()
      .set('fechaInicio', desde)
      .set('fechaFin', hasta);

    return this.http.get(baseUrlCrudPrestamo + '/listaSolicitudPorFechas', {
      params,
    });
  }

  obtenerPrestamosPorPrestamista(
    idPrestamista: number
  ): Observable<SolicitudPrestamo[]> {
    return this.http.get<SolicitudPrestamo[]>(
      baseUrlSolicitud + '/prestamosPorPrestamista/' + idPrestamista
    );
  }
}

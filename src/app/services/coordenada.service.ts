import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordenada } from '../models/coordenada.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT + '/coordenada';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT + '/crudCoordenada';
const baseUrlConsultaPrueba = AppSettings.API_ENDPOINT + '/consultaCoordenada';

@Injectable({
  providedIn: 'root'
})
export class CoordenadaService {

  constructor(private http: HttpClient) { }

  registrar(data: Coordenada): Observable<any> {
    return this.http.post(baseUrlPrueba, data);
  }

  validaPrestatarioRegistra(idPrestatario: string): Observable<any> {
    console.log('>>> Service >> validaPrestatarioRegistra [inicio] ' + idPrestatario);
    return this.http.get<any>(baseUrlPrueba + '/validaPrestatarioRegistra?idPrestatario=' + idPrestatario);
  }
  validaPrestatarioActualiza(idPrestatario: string, idCoordenada: number): Observable<any> {
    console.log('>>> Service >> validaPrestatarioActualiza [inicio] ' + idPrestatario)
    return this.http.get<any>(baseUrlCrudPrueba + '/validaPrestatarioActualiza?idPrestatario=' + idPrestatario + "&idCoordenada=" + idCoordenada);
  }

  registrarCrud(data: Coordenada): Observable<any> {
    return this.http.post(baseUrlCrudPrueba + "/registraCoordenada", data);
  }
  actualizarCrud(data: Coordenada): Observable<any> {
    return this.http.put(baseUrlCrudPrueba + "/actualizaCoordenada", data);
  }
  eliminarCrud(id: number): Observable<any> {
    return this.http.delete(baseUrlCrudPrueba + "/eliminaCoordenada/" + id);
  }
  consultarCrud(filtro: string): Observable<any> {
    return this.http.get(baseUrlCrudPrueba + "/listaPorPrestatarioLike/" + filtro);
  }

  consultaCoordenada(latitud: number, longitud: number, estado: number): Observable<any> {
    console.log(">>> Service >> consultaCoordenada [inicio] " + latitud + " " + longitud)
    return this.http.get<any>(baseUrlConsultaPrueba + "/consultaCoordenada?latitud=" + latitud + "&longitud=" + longitud + "&estado=" + estado)
  }
}

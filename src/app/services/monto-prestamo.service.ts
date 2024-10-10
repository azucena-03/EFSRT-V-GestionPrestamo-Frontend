import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontoPrestamo } from '../models/monto-prestamo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/montoPrestamo';
const baseUrlCrudMonto = AppSettings.API_ENDPOINT+ '/crudMontoPrestamo';
const baseUrlConsulta = AppSettings.API_ENDPOINT+ '/consultaMonto';
@Injectable({
  providedIn: 'root'
})
export class MontoPrestamoService {

  constructor(private http:HttpClient) { }

  registrar(data:MontoPrestamo):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }
    //CRUD
    registrarCrud(data:MontoPrestamo):Observable<any>{
      return this.http.post(baseUrlCrudMonto+"/registraMontoPrestamo", data);
    }
    actualizarCrud(data:MontoPrestamo):Observable<any>{
      return this.http.put(baseUrlCrudMonto+"/actualizaMontoPrestamo", data);
    }
    eliminarCrud(id:number):Observable<any>{
      return this.http.delete(baseUrlCrudMonto+"/eliminaMontoPrestamo/"+id);
    }
    consultarCrud(filtro: string): Observable<any> {
      return this.http.get(baseUrlCrudMonto + "/listaMontoPrestamoPorCapital/" + filtro);
      
  }

  consultaMonto(capital: number, estado: number, monto: number,idDias: string): Observable<any> {
    console.log('>>> Service >> consultaEjemplo [inicio]' + capital);
    return this.http.get<any>(baseUrlConsulta+'/consultaComplejoMonto?capital='+capital +"&estado="+estado +"&monto="+monto + "&idDias="+idDias);
  }
}

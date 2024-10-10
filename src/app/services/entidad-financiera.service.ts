import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntidadFinanciera } from '../models/entidad-financiera.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlEntidad = AppSettings.API_ENDPOINT + '/entidadFinanciera';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT + '/crudFinaciera';
const baseUrlConsultaPrueba = AppSettings.API_ENDPOINT + '/consultaFinanciera';

@Injectable({
  providedIn: 'root',
})
export class EntidadFinancieraService {
  constructor(private http: HttpClient) {}

  registrar(data: EntidadFinanciera): Observable<any> {
    return this.http.post(baseUrlEntidad, data);
  }

  validaDescripcionRegistra(nombre: string): Observable<any> {
    console.log('>>> Service >> validaDescripcionRegistra [inicio]' + nombre);
    return this.http.get<any>(
      baseUrlEntidad + '/validaDescripcionRegistra?nombre=' + nombre
    );
  }


  //PC2: CRUD de Ejemplo
  registrarCrud(data:EntidadFinanciera):Observable<any>{
    return this.http.post(baseUrlCrudPrueba+"/registraEntidadFinanciera", data);
  }
  actualizarCrud(data:EntidadFinanciera):Observable<any>{
    return this.http.put(baseUrlCrudPrueba+"/actualizaEntidadFinanciera", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudPrueba+"/eliminaEntidadFinanciera/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaEntidadFinancieraPorNombreLike/"+ filtro);
  }

  consultaFinanciera(nombre: string, gerente: string, tipoEntidad: string , estado: number): Observable<any>{
    console.log('>>> Service >> consultaCuenta [inicio]' + nombre);
    return this.http.get<any>(baseUrlConsultaPrueba+'/listaConsultaComplejaEntidadFinanciera?nombre='+nombre+'&gerente='+gerente+'&tipoEntidad='+tipoEntidad+'&estado='+estado);
  }
}


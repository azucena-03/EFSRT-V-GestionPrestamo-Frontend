import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Ejemplo } from '../models/ejemplo.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT + '/ejemplo';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT + '/crudEjemplo';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {

  constructor(private http:HttpClient) { }

  //PC1: Registro de Ejemplo
  registrar(data:Ejemplo):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  //Validaciones para PC1 y PC2
  validaDescripcionRegistra(descripcion: string): Observable<any>{
    console.log('>>> Service >> validaDescripcionRegistra [inicio]' + descripcion);
    return this.http.get<any>(baseUrlPrueba+'/validaDescripcionRegistra?descripcion='+descripcion);
  }
  validaDescripcionActualiza(descripcion: string, id:number): Observable<any>{
    console.log('>>> Service >> validaDescripcionActualiza [inicio]' + descripcion);
    return this.http.get<any>(baseUrlCrudPrueba+'/validaDescripcionActualiza?descripcion='+descripcion + "&idEjemplo="+id);
  }


  //PC2: CRUD de Ejemplo
  registrarCrud(data:Ejemplo):Observable<any>{
    return this.http.post(baseUrlCrudPrueba+"/registraEjemplo", data);
  }
  actualizarCrud(data:Ejemplo):Observable<any>{
    return this.http.put(baseUrlCrudPrueba+"/actualizaEjemplo", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudPrueba+"/eliminaEjemplo/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaEjemploPorNombreLike/"+ filtro);
  }

}

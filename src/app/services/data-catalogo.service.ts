import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataCatalogo } from '../models/dataCatalogo.model';
import { AppSettings } from '../app.settings';
import { Catalogo } from '../models/catalogo.model';




const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/dataCatalogo';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT+ '/crudDataCatalogo';
const baseUrlConsultaPrueba = AppSettings.API_ENDPOINT+ '/consultaDataController';


@Injectable({
  providedIn: 'root'
})
export class DataCatalogoService {

  constructor(private http:HttpClient) { }

  listaCatalogo():Observable<Catalogo[]>{
      return this.http.get<Catalogo[]>(baseUrlPrueba + "/listaCatalogo");
  }

  registrar(data:DataCatalogo):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  validaDescripcionRegistra(descripcion: string): Observable<any>{
    console.log('>>> Service >> validaDescripcionRegistra [inicio]' + descripcion);
    return this.http.get<any>(baseUrlPrueba+'/validaDescripcionRegistra?descripcion='+descripcion);
  }

  vlidaDescripcionActualiza(descripcion: string, id: number): Observable<any>{
    console.log('>>> Service >> validaDescripcionRegistra [inicio]' + descripcion);
    return this.http.get<any>(baseUrlCrudPrueba+'/validaDescripcionActualiza?descripcion='+descripcion + "&idDataCatalogo="+ id);
  }

  registrarCrud(data:DataCatalogo):Observable<any>{
    return this.http.post(baseUrlCrudPrueba+"/registraDataCatalogo", data);
  }
  actualizarCrud(data:DataCatalogo):Observable<any>{
    return this.http.put(baseUrlCrudPrueba+"/actualizaDataCatalogo", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudPrueba+"/eliminaDataCatalogo/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaDataCatalogoPorNombreLike/"+ filtro);
  }

  consultaCuenta(descripcion: string, idCatalogo: string, estado: number): Observable<any>{
    console.log('>>> Service >> consultaCuenta [inicio]' + descripcion);
    return this.http.get<any>(baseUrlConsultaPrueba+'/consultaComplejoDataCatalogo?descripcion='+descripcion+'&idCatalogo='+idCatalogo+'&estado='+estado);
  }

}

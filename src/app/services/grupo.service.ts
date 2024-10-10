import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../models/grupo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlGrupo = AppSettings.API_ENDPOINT+ '/grupo';
const baseUrlCrudGrupo = AppSettings.API_ENDPOINT + '/crudGrupo';
const baseUrlConsultaGrupo = AppSettings.API_ENDPOINT + '/consultaGrupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http:HttpClient) { }

  registrar(data:Grupo):Observable<any>{
    return this.http.post(baseUrlGrupo, data);
  }

  validaDescripcionRegistra(descripcion: string): Observable<any>{
    console.log('>>> Service >> validaDescripcionRegistra [inicio]' + descripcion);
    return this.http.get<any>(baseUrlCrudGrupo+'/validaDescripcionRegistra?descripcion='+descripcion);
  }

  validaDescripcionActualiza(descripcion: string, id:number): Observable<any>{
    console.log('>>> Service >> validaDescripcionActualiza [inicio]' + descripcion);
    return this.http.get<any>(baseUrlCrudGrupo+'/validaDescripcionActualiza?descripcion='+descripcion + "&idGrupo="+id);
  }

  //PC2: CRUD de Ejemplo
  registrarCrud(data:Grupo):Observable<any>{
    return this.http.post(baseUrlCrudGrupo+"/registraGrupo", data);
  }
  actualizarCrud(data:Grupo):Observable<any>{
    return this.http.put(baseUrlCrudGrupo+"/actualizaGrupo", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudGrupo+"/eliminaGrupo/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudGrupo+"/listaGrupoPorNombreLike/"+ filtro);
  }

   //PC3: Consulta de Grupo
   consultaGrupo(descripcion: string, idUsuarioLider: string, estado: number): Observable<any> {
    console.log('>>> Service >> consultaGrupo [inicio]' + descripcion);
    return this.http.get<any>(baseUrlConsultaGrupo+'/consultaComplejoGrupo?descripcion='+descripcion + "&idUsuarioLider="+idUsuarioLider + "&estado="+estado );
  }
}


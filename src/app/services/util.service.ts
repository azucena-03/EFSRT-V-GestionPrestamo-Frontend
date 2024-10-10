import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Pais } from '../models/pais.model';
import { DataCatalogo } from '../models/dataCatalogo.model';
import { Ubigeo } from '../models/ubigeo.model';
import { Usuario } from '../models/usuario.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil+"/listaPais");
  }

  listarDepartamento(): Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaDepartamentos");
  }

  listaProvincias(paramDep:any): Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaProvincias/"+paramDep);
  }

  listaDistritos(paramDep:any,paramProv:any): Observable<Ubigeo[]>{
    return this.http.get<Ubigeo[]>(baseUrlUtil+"/listaDistritos/"+paramDep+"/"+paramProv);
  }

  listaTipoEntidadBancaria():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaTipoEntidadBancaria");
  }

  listaTipoMoneda():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaTipoMoneda");
  }

  listaDiasPrestamo():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaDiasPrestamo");
  }

  listaEstadoSolicitud():Observable<DataCatalogo[]>{
    return this.http.get<DataCatalogo[]>(baseUrlUtil+"/listaEstadoSolicitud");
  }

  listaJefePrestamistaTotales():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(baseUrlUtil+"/listaJefePrestamistaTotales");
  }

  listaPrestamistaDeUnJefe(param:any): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(baseUrlUtil+"/listaPrestamistaDeUnJefe/"+param);
  }

  listaPrestamistariosDeUnPrestamista(param: any): Observable<Usuario[]>{
    console.log(">> listaPrestamistariosDeUnPrestamista");
    console.log(this.http.get<Usuario[]>(baseUrlUtil + "/listaPrestamistariosDeUnPrestamista/" + param));
    
    return this.http.get<Usuario[]>(baseUrlUtil+"/listaPrestamistariosDeUnPrestamista/"+param);
  }
}



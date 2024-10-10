import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../models/cuenta.model';
import { Observable } from 'rxjs';
import { EntidadFinanciera } from '../models/entidad-financiera.model';
import { EntidadFinanciera2 } from '../models/entidad-financiera2.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/cuenta';
const baseUrlPrueba1 = AppSettings.API_ENDPOINT+ '/cuentaFinanciera';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT+ '/crudCuenta';
const baseUrlConsultaPrueba = AppSettings.API_ENDPOINT+ '/consultaCuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http:HttpClient) { }

  //pc1
  registrar(data:Cuenta):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  //pc1
  validaNrocuentaRegistra(numero: string): Observable<any>{
    console.log('>>> Service >> validaNrocuentaRegistra [inicio]' + numero);
    return this.http.get<any>(baseUrlPrueba+'/validaNrocuentaRegistra?numero='+numero);
  }

  listaEntidadesFinancieras():(Observable<EntidadFinanciera>){
    return this.http.get<EntidadFinanciera>(baseUrlPrueba+"/listaEntidadesFinancieras");
  }

  listaFinanciera():Observable<EntidadFinanciera2[]>{
    return this.http.get<EntidadFinanciera2[]>(baseUrlPrueba1+"/listaFinanciera");
  }

  //pc2
  validaNrocuentaActualiza(numero: string, idCuenta: number): Observable<any>{
    console.log('>>> Service >> validaNrocuentaActualiza [inicio]' + numero);
    return this.http.get<any>(baseUrlCrudPrueba+'/validaNrocuentaActualiza?numero='+numero+'&idCuenta='+idCuenta);
  }
  
  registrarCrud(data:Cuenta):Observable<any>{
    return this.http.post(baseUrlCrudPrueba+"/registraCuenta", data);
  }
  actualizarCrud(data:Cuenta):Observable<any>{
    return this.http.put(baseUrlCrudPrueba+"/actualizaCuenta", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudPrueba+"/eliminaCuenta/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaCuentaPorNombreLike/"+ filtro);
  }

  //PC3: Consulta de Ejemplo
  consultaCuenta(numero: string, idEntidadFinanciera: string, estado: number , idTipoMoneda: string, idTipoFinanciera: string): Observable<any>{
    console.log('>>> Service >> consultaCuenta [inicio]' + numero);
    return this.http.get<any>(baseUrlConsultaPrueba+'/consultaComplejoCuenta?numero='+numero+'&idEntidadFinanciera='+idEntidadFinanciera+'&estado='+estado+'&idTipoMoneda='+idTipoMoneda+'&idTipoFinanciera='+idTipoFinanciera);
  }

}

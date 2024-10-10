import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { IndexComponent } from './index/index.component';

import { AgregarEjemploComponent } from './components/agregar-ejemplo/agregar-ejemplo.component';
import { AgregarCoordenadaComponent } from './components/agregar-coordenada/agregar-coordenada.component';
import { AgregarCuentaComponent } from './components/agregar-cuenta/agregar-cuenta.component';
import { AgregarDataCatalogoComponent } from './components/agregar-data-catalogo/agregar-data-catalogo.component';
import { AgregarEntidadFinancieraComponent } from './components/agregar-entidad-financiera/agregar-entidad-financiera.component';
import { AgregarGrupoComponent } from './components/agregar-grupo/agregar-grupo.component';
import { AgregarMontoPrestamoComponent } from './components/agregar-monto-prestamo/agregar-monto-prestamo.component';
import { AgregarPrestatarioComponent } from './components/agregar-prestatario/agregar-prestatario.component';
import { AgregarSolicitudPrestamoComponent } from './components/agregar-solicitud-prestamo/agregar-solicitud-prestamo.component';

import { CrudEjemploComponent } from './components/crud-ejemplo/crud-ejemplo.component';
import { CrudCoordenadaComponent } from './components/crud-coordenada/crud-coordenada.component';
import { CrudCuentaComponent } from './components/crud-cuenta/crud-cuenta.component';
import { CrudDataCatalogoComponent } from './components/crud-data-catalogo/crud-data-catalogo.component';
import { CrudMontoPrestamoComponent } from './components/crud-monto-prestamo/crud-monto-prestamo.component';
import { CrudPrestatarioComponent } from './components/crud-prestatario/crud-prestatario.component';
import { CrudSolicitudPrestamoComponent } from './components/crud-solicitud-prestamo/crud-solicitud-prestamo.component';
import { CrudEntidadFinancieraComponent } from './components/crud-entidad-financiera/crud-entidad-financiera.component';
import { CrudGrupoComponent } from './components/crud-grupo/crud-grupo.component';

import { ConsultaEjemploComponent } from './components/consulta-ejemplo/consulta-ejemplo.component';
import { ConsultaCoordenadaComponent } from './components/consulta-coordenada/consulta-coordenada.component';
import { ConsultaCuentaComponent } from './components/consulta-cuenta/consulta-cuenta.component';
import { ConsultaDataCatalogoComponent } from './components/consulta-data-catalogo/consulta-data-catalogo.component';
import { ConsultaMontoPrestamoComponent } from './components/consulta-monto-prestamo/consulta-monto-prestamo.component';
import { ConsultaPrestatarioComponent } from './components/consulta-prestatario/consulta-prestatario.component';
import { ConsultaGrupoComponent } from './components/consulta-grupo/consulta-grupo.component';
import { ConsultaEntidadFinacieraComponent } from './components/consulta-entidad-finaciera/consulta-entidad-finaciera.component';
import { ConsultaSolicitudPrestamoComponent } from './components/consulta-solicitud-prestamo/consulta-solicitud-prestamo.component';


export const routes: Routes = [
    //PC1 - Registro de Entidades
    {path:"verRegistroCoordenada", component:AgregarCoordenadaComponent },
    {path:"verRegistroCuenta", component:AgregarCuentaComponent },
    {path:"verRegistroDataCatalogo", component:AgregarDataCatalogoComponent },
    {path:"verRegistroEntidadFinanciera", component:AgregarEntidadFinancieraComponent },
    {path:"verRegistroGrupo", component:AgregarGrupoComponent },
    {path:"verRegistroMontoPrestamo", component:AgregarMontoPrestamoComponent },
    {path:"verRegistroPrestatario", component:AgregarPrestatarioComponent },
    {path:"verRegistroSolicitudPrestamo", component:AgregarSolicitudPrestamoComponent },
    {path:"verRegistroEjemplo", component:AgregarEjemploComponent },
  
     //PC2 - CRUD de Entidades
    {path:"verCrudCoordenada", component:CrudCoordenadaComponent },
    {path:"verCrudCuenta", component:CrudCuentaComponent },
    {path:"verCrudDataCatalogo", component:CrudDataCatalogoComponent },
  { path: "verCrudEntidadFinanciera", component: CrudEntidadFinancieraComponent },
    {path:"verCrudGrupo", component:CrudGrupoComponent},
    {path:"verCrudMontoPrestamo", component:CrudMontoPrestamoComponent },
    {path:"verCrudPrestatario", component:CrudPrestatarioComponent },
    {path:"verCrudSolicitudPrestamo", component:CrudSolicitudPrestamoComponent },
    {path: "verCrudEjemplo", component: CrudEjemploComponent },
    
    //PC3 - Consulta de Entidades
    {path:"verConsultaCoordenada", component:ConsultaCoordenadaComponent },
    {path:"verConsultaCuenta", component:ConsultaCuentaComponent },
    {path:"verConsultaDataCatalogo", component:ConsultaDataCatalogoComponent },
    {path:"verConsultaEntidadFinanciera", component: ConsultaEntidadFinacieraComponent},
    {path:"verConsultaGrupo", component:ConsultaGrupoComponent},
    {path:"verConsultaMontoPrestamo", component:ConsultaMontoPrestamoComponent },
    {path:"verConsultaPrestatario", component:ConsultaPrestatarioComponent },
    {path:"verConsultaSolicitudPrestamo", component: ConsultaSolicitudPrestamoComponent },
    {path:"verConsultaEjemplo", component: ConsultaEjemploComponent },

  
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];
  

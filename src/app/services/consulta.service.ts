import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { Global } from './global';

@Injectable()
export class ConsultaService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    getConsultas(pacienteId):Observable<any>{
        return this._http.get(this.url+'consulta/search/'+pacienteId);
    }

    getConsulta(consultaId):Observable<any>{
        return this._http.get(this.url+'consulta/obtener/'+consultaId);
    }

    create(consulta):Observable<any>{
        
        let params = JSON.stringify(consulta);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'consulta/save', params, {headers: headers});
    }

    update(id, consulta):Observable<any>{
        let params = JSON.stringify(consulta);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'consulta/update/'+id, params, {headers: headers});;
    }
}
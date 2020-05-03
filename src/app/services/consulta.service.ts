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

    getConsulta():Observable<any>{
        return this._http.get(this.url+'consulta/listar');
    }

    create(consulta):Observable<any>{
        
        let params = JSON.stringify(consulta);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'consulta/save', params, {headers: headers});
    }
}
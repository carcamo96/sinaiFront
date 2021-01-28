import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { Global } from '../../../services/global';

@Injectable()
export class PacienteService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    
    getPacientes():Observable<any>{
        return this._http.get(this.url+'paciente/listar');
    }

    getPaciente(pacienteId):Observable<any>{
        return this._http.get(this.url+'paciente/obtener/'+pacienteId);
    }

    create(paciente):Observable<any>{
        
        let params = JSON.stringify(paciente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'paciente/save', params, {headers: headers});
    }
    update(id, paciente):Observable<any>{

        let params = JSON.stringify(paciente);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'paciente/update/'+id, params, {headers: headers});
    }
    getMunicipios(departamento):Observable<any>{
        return this._http.get(this.url+'departamento/listar/'+departamento);
    }

}
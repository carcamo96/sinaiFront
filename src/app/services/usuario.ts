import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class UsuarioService{

    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    create(usuario):Observable<any>{
        
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'usuario/save', params, {headers: headers});
    }

    update(id, usuario):Observable<any>{
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'consulta/update/'+id, params, {headers: headers});;
    }

    getUsuarios():Observable<any>{
        return this._http.get(this.url+'usuario/listar/');
    }

}
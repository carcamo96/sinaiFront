import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Global } from '../../../services/global';
import { Diagnostico } from '../../../models/diagnostico';


@Injectable()
export class ConsultaService{
    public url: string;
    public diags: Diagnostico[] = [];
    private subJ =new BehaviorSubject<any>("");
    public sub$=this.subJ.asObservable();
    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    getAllConsultas():Observable<any>{
        return this._http.get(this.url+'consulta/listar');
    }

    getConsultas(pacienteId):Observable<any>{
        return this._http.get(this.url+'consulta/search/'+pacienteId);
    }

    getConsulta(consultaId):Observable<any>{
        return this._http.get(this.url+'consulta/obtener/'+consultaId);
    }

    getDiagnosticos(consultaId):Observable<any>{
        return this._http.get(this.url+'consulta/searchDiagnostico/'+consultaId);
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

    //Uso de localStorage para guardar los motivos de consulta comunes
    addMotivos(key: string, data: string[]){
        //El localStorage solo almacena string o numeros por eso se convierte a json (menos pesado)
        try {
            localStorage.setItem(key, JSON.stringify(data));    
        } catch (error) {
            console.log("addMotivos", error); 
        }
    }

    getMotivos(key: string){
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            console.log("getMotivos: ", error);
        }
    }

}
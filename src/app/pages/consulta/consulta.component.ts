import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from 'ngx-toastr';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from 'src/app/models/consulta';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [ConsultaService]
})
export class ConsultaComponent implements OnInit {

//Se le pasan los titulos y los links de las paginas que preseden esta pagina
public breads: any[] = [
  {titulo: 'Home', link: '/home'}
];

public consulta: Consulta;
public nomPaciente: string;
public atl = new Date();
public status: string;
public consultas: any;

  constructor(
    private toastr: ToastrService,
    private _consultaService: ConsultaService
    ) { 
    this.nomPaciente = "";
    this.consulta = new Consulta('','','','','','','','','','','','','','',);
    this.consulta.paciente='5eade4cf9ec9ee0017a5f982';
    this.consulta.fechaCre='02/06/2010';
    this.consulta.indiceMC='14';
    this.consultas = {
      motivo: '',
      tiemSintoma: '',
      fechaConsul: '',
      historia: '',
      antePatol: '',
      alergias: '',
      peso:'',
      talla:'',
      temperatura:'',
      presionArt:'',
      freCardia:'',
      indiceMC:''
    }
    this.consulta.fechaConsul=this.atl.toLocaleDateString() +' '+ this.atl.toLocaleTimeString();
  }

  ngOnInit(){
    this._consultaService.getConsulta().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(){
    //console.log(f.value);
    //this.showSuccess("Se ha realizado una nueva consulta", "Nueva consulta");
    

    this._consultaService.create(this.consulta).subscribe(
      response => {
        if (response.status == 'succes') {
          this.status = 'succes';
          this.consulta = response.consultas;

          //Alert
          this.showSuccess("Se ha realizado una nueva consulta", "Nueva consulta");
          
        }else{
          this.status = 'error';
        }
      },
      error => {
          console.log(error);
          this.status = 'error';
      }

    );
}

  // Alerta de exito
  showSuccess(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo);
  }

}

import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from 'ngx-toastr';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from 'src/app/models/consulta';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Paciente } from '../../models/paciente';


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


public nomPaciente: string;
public atl = new Date();
public status: string;
public consulta: any;
public spinnStatus: boolean;



  constructor(
    private toastr: ToastrService,
    private _consultaService: ConsultaService,
    private loadingBarService: LoadingBarService
    ) { 
    this.consulta = {
      paciente:'5eac959e35217825fdb963d8',
      fechaCre:'02/06/2010',
      indiceMC:'14',
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
      freCardia:''
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

  onSubmit(f:NgForm){
    this.loadingBarService.start();
    if(f.valid)
    { 
      let consulta = new Consulta(
        this.consulta.paciente,
        this.consulta.motivo,
        this.consulta.tiemSintoma,
        this.consulta.fechaConsul,
        this.consulta.historia,
        this.consulta.antePatol,
        this.consulta.alergias,
        this.consulta.peso,
        this.consulta.talla,
        this.consulta.temperatura,
        this.consulta.presionArt,
        this.consulta.freCardia,
        this.consulta.indiceMC,
        this.consulta.fechaCre
      );
      this._consultaService.create(consulta).subscribe(
        response => {
          if (response.status == 'success') {
            this.loadingBarService.complete();
            this.status = 'success';
            this.spinnStatus=false;
            //Alert
            this.showSuccess("Se ha realizado una nueva consulta", "Nueva consulta");
            
          }else{
            this.status = 'error';
          }
        },
        error => {
            console.log(error);
            this.loadingBarService.complete();
            this.status = 'error';
            this.showError("No se ha conctado con el servidor", "Error");
        }

      );
   }
   f.resetForm();
   this.limpiarCampos();
}

spnChange(){
  this.spinnStatus = true;
}

  // Alerta de exito
  showSuccess(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo);
  }

  limpiarCampos(){
    this.consulta = {
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
  }

  showError(mensaje: string, titulo: string) {
    this.toastr.error(mensaje, titulo, {
        progressBar: true,
        progressAnimation: 'decreasing'
    });
  }

}

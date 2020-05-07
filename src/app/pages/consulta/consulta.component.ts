import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from 'ngx-toastr';
import { ConsultaService } from '../../services/consulta.service';
import { Consulta } from 'src/app/models/consulta';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Paciente } from '../../models/paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [ConsultaService, PacienteService]
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
public paciente: Paciente;
public indice: string;


  constructor(
    private toastr: ToastrService,
    private _consultaService: ConsultaService,
    private _pacienteService: PacienteService,
    private loadingBarService: LoadingBarService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { 
    this.consulta = {
      paciente: '',
      fechaCre:'02/06/2010',
      indiceMC:'',
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
      diagnostico:''
    }
    this.consulta.fechaConsul=this.atl.toLocaleDateString() +' '+ this.atl.toLocaleTimeString();
  }

  ngOnInit(){
    this.cargarPaciente();
    this.consulta.paciente = this.paciente.nombre;
    
    console.log(this.paciente.nombre);
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
        this.consulta.peso+' kg',
        this.consulta.talla+' m',
        this.consulta.temperatura+' °C',
        this.consulta.presionArt+' mm gh',
        this.consulta.freCardia+' bpm',
        this.consulta.indiceMC,
        this.consulta.fechaCre,
        this.consulta.diagnostico
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

  cargarPaciente(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._pacienteService.getPaciente(id).subscribe(
        response => {
          console.log(response);
          this.paciente = response.paciente;
        },
        error => {
          console.log("nadaaa "+error);
          //this._router.navigate(['/home']);
        }
      );
    });
    
  }

  cal(event){

    var pesoP=event;

    this.indice = pesoP;
  }

  cal2(event){

    var tallaP=event;
    var pes = +this.indice;
    let indice;
    if (tallaP != null || this.consulta.talla !=null) {
       indice = pes / Math.pow(tallaP,2);
       this.indice =''+ indice;
    }else{
      this.indice=''+0;
    }
    
  }

  cal3(){
    var pes =  parseFloat(this.consulta.peso);
    var tall =  parseFloat(this.consulta.talla);
    if(tall != 0 || tall != null || tall != Infinity){
      let indice = pes / Math.pow(tall,2);
      this.indice =''+ parseFloat(''+indice).toFixed(1);
    }else{
      //this.indice = '';
    }
  }

}

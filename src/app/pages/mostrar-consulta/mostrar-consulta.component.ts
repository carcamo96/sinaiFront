import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { Consulta } from '../../models/consulta';
import { NgForm } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-mostrar-consulta',
  templateUrl: './mostrar-consulta.component.html',
  styleUrls: ['./mostrar-consulta.component.css'],
  providers: [ConsultaService, PacienteService]
})
export class MostrarConsultaComponent implements OnInit {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
public breads: any[] = [
  {titulo: 'Home', link: '/home'}
];

  public consulta: any;
  public fechaAux = '';
  public idpa: string;
  public status: string;
  public paciente: Paciente;

  constructor(
      private _consultaService: ConsultaService,
      private _pacienteService: PacienteService,
      private toastr: ToastrService,
      private loadingBarService: LoadingBarService,
      private _route: ActivatedRoute
  ) {
    this.inicializarFechaActual();
  }

  ngOnInit(): void {
    this.cargarConsulta();
    //console.log(this.consulta.paciente);
    //this.cargarPaciente();
  }

  showSuccess(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo);
  }

  showError(mensaje: string, titulo: string) {
    this.toastr.error(mensaje, titulo, {
        progressBar: true,
        progressAnimation: 'decreasing'
    });
  }

  inicializarFechaActual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            var dia=dd.toString();
            dia='0'+dd;
        } 
        if(mm<10){
          var mes = mm.toString();
            mes='0'+mm;
        } 

    this.fechaAux = yyyy+'-'+mes+'-'+dia;
    console.log(this.fechaAux);
}

  cargarConsulta(){
    this._route.params.subscribe(params => {
      this.idpa = params['id'];

      this._consultaService.getConsulta(this.idpa).subscribe(
        response => {
          if (response.consulta) {
            this.consulta = response.consulta;
            console.log(this.consulta);
          }
        },
        error => {
            console.log(error);
        }
      );
    });
  }

  onSubmit(f: NgForm){
    if(f.valid)
    { 
      let consulta = new Consulta(
        this.consulta.paciente,
        this.consulta.motivo,
        this.consulta.tiemSintoma,
        new Date(this.consulta.fechaConsul),
        this.consulta.historia,
        this.consulta.antePatol,
        this.consulta.alergias,
        this.consulta.peso,
        this.consulta.talla,
        this.consulta.temperatura,
        this.consulta.presionArt,
        this.consulta.freCardia,
        this.consulta.indiceMC,
        new Date(this.consulta.fechaCre),
        this.consulta.diagnostico
      );    
      this._consultaService.update(this.idpa,consulta).subscribe(
        response => {
          if (response.status == 'Success') {
            this.loadingBarService.complete();
            this.status = 'Success';
            //Alert
            this.showSuccess("Se ha modificado la consulta", "Consulta modificada");
            
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
  }

  cargarPaciente(){
    
    console.log(this.consulta.paciente);
      this._pacienteService.getPaciente(this.consulta.paciente).subscribe(
        response => {
          console.log(response);
          this.paciente = response.paciente;
          console.log(this.paciente);
        },
        error => {
          console.log("nadaaa "+error);
          //this._router.navigate(['/home']);
        }
      );
    
    
  }


}

import { Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Paciente } from '../../models/paciente';
//importando para navegar en las rutas
import {Router, ActivatedRoute, Params} from '@angular/router';
//Importando servicio para pacientes
import { PacienteService } from '../../services/paciente.service';

//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from 'ngx-toastr';
//importando ngx-loading
import { LoadingBarService } from '@ngx-loading-bar/core';
//importando para usar las sweet alerts
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';



@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.css'],
  providers:[PacienteService]
})
export class FormularioPacienteComponent implements OnInit {

  @ViewChild('redireccionSwal') private redireccionSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [
    {titulo: 'Home', link: '/home'}
  ];

  public paciente: any;//variable auxiliar que se manejara como ngModel
  public edad: number; //variable auxiliar para mostrar la edad
  public fechaAux = ''; //para definir la fecha actual para el datePicker

  public status: string;
  private idResponse = '';

  progress = 0;

  public ayuda = false;//Para manejar los popovers

  constructor(private toastr: ToastrService,
     private _pacienteService: PacienteService,
     private loadingBarService: LoadingBarService,
     private router: Router,
     private route: ActivatedRoute) {
    this.paciente = {
      nombre: '',
      apellidos: '',
      fechaNac: '',
      gen: 'M',
      telefono: '',
      encargado: '',
      parentesco: '',
      faContacto: '',
      telFaContacto: '',
      direccion: '',
      otrosDatos: ''
    }

    this.inicializarFechaActual();

  }

  ngOnInit(): void {

  }

  //Enviando datos
  onSubmit(f:NgForm){
  
    this.loadingBarService.start();
    this.progress = 30;
    if(f.valid){
      let paciente = new Paciente(
        this.paciente.nombre,
        this.paciente.apellidos,
        new Date(this.paciente.fechaNac),
        this.paciente.gen,
        this.paciente.telefono,
        this.paciente.encargado,
        this.paciente.parentesco,
        this.paciente.faContacto,
        this.paciente.telFaContacto,
        this.paciente.direccion,
        this.paciente.otrosDatos
      );
      this.progress = 50;

      this._pacienteService.create(paciente).subscribe(
        response => {

          this.progress = 100;
          if(response.status == 'success'){
            this.loadingBarService.complete();
            this.status = 'success';
            this.idResponse = response.paciente._id;
            //console.log("Respuesta de insercion: "+response.paciente._id);
            this.redireccionSwal.fire();

          }else{
            this.loadingBarService.complete();
            this.status = 'error';
            //console.log("Respuesta de insercion err:"+response.message);
            //this.showError("No se ha podido registrar", "Expediente no registrado");
            this.errorSwal.fire();
          }

        },
        error => {
          this.loadingBarService.complete();
          this.status = 'error';
          //this.showError("No se ha conctado con el servidor", "Error");
          this.errorSwal.fire();
        }
      );

    }


      f.resetForm({r1: 'M' }); //importante!!! resetea y se le pasa un json con los nuevo valores por defecto
      this.edad = undefined;
      this.limpiarCampos(); //limpia los campos del objeto auxiliar

  }

  //Inicializar fecha actual en el date picker
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
  }


  // Evento de cambio de fecha para mostrar la edad
  cambioFecha(event){
     
      let anioActual = new Date();
      let mesActual = anioActual.getMonth() + 1;
      let diaActual = anioActual.getDate();

      let fechaNac = new Date(event);
      let mesNac = fechaNac.getMonth() + 1;
      let diaNac = fechaNac.getDate();

      this.paciente.fechaNac = event; // guardando en el objeto auxiliar

      //Calculando edad relativa
      let edad = anioActual.getFullYear() - fechaNac.getFullYear();

      if(mesActual < mesNac){
          edad--;
      }
      if((mesNac == mesActual) && (diaActual < diaNac)){
          edad--;
      }

      this.edad = edad;

  }

  esMenor(){
    return this.edad >= 0 && this.edad < 18;
  }

  limpiarCampos(){
    this.paciente = {
      nombre: '',
      apellidos: '',
      fechaNac: '',
      gen: 'M',
      telefono: '',
      encargado: '',
      parentesco: '',
      faContacto: '',
      telFaContacto: '',
      direccion: '',
      otrosDatos: ''
    }
  }

  // Alerta de exito
  showSuccess(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo, {
        progressBar: true,
        progressAnimation: 'decreasing'
    });
  }

  showInfo(mensaje: string, titulo: string) {
    this.toastr.info(mensaje, titulo, {
        progressBar: true,
        progressAnimation: 'decreasing'
    });
  }

  
  showError(mensaje: string, titulo: string) {
    this.toastr.error(mensaje, titulo, {
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }
  
  //Para redireccionar haciendo click en la toastr
  /*
  showInfoRedirect(mensaje: string, titulo: string) {
    this.toastr.info(mensaje, titulo, {
        progressBar: true,
        progressAnimation: 'decreasing',
        timeOut: 10000
    }).onTap.subscribe(() => this.redireccionar());
  }
  */
  redireccionar(){
    this.router.navigate(['/consulta/', this.idResponse]);
  }

  //Para activar la ayuda del formulario
  activarPopovers(p1){
      this.ayuda = !this.ayuda;

      if(this.ayuda == false){
          p1.close();
      }
  }

}

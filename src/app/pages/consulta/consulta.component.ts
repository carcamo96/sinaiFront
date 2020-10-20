import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from "ngx-toastr";
import { ConsultaService } from "../../services/consulta.service";
import { Consulta } from "src/app/models/consulta";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { Paciente } from "../../models/paciente";
import { ActivatedRoute, Router } from "@angular/router";
import { PacienteService } from "../../services/paciente.service";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Subject } from 'rxjs';

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
  providers: [ConsultaService, PacienteService],
})
export class ConsultaComponent implements OnInit {
  @ViewChild("redireccionSwal") private redireccionSwal: SwalComponent;
  @ViewChild("errorSwal") private errorSwal: SwalComponent;
  @ViewChild("msgCompletarConsulta") private adjuntarDatos: SwalComponent;
  @ViewChild('confirmarSwal') private confirmarSwal: SwalComponent;

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [{ titulo: "Home", link: "/admin" }, {titulo: "Expedientes", link: "/admin/expedientes"}];

  //Uso este objeto Subject para emitir el resultado del evento response al hijo 
  public eventsSubject: Subject<any> = new Subject<any>();

  public consulta; //Con esta variable se maneja la consulta

  public nomPaciente: string; //Para mostrar el nombre completo del paciente
  public edad: number;  //Para guardar el calculo de la edad en base a su edad de nacimiento
  public genero: string;//Para colocar el genero en toda su palabra
  public edadAnios: string;//Para concatenar edad + "Años"
  public numeroExpediente: string = ''; //Para mostrar el numero de expediente

  public ayuda = false; //Para manejar la ayuda

  public paciente: Paciente; //Objeto que mapea los datos del paciente para manejarlos con POO
  public idpa: string; //Maneja el id del paciente que se ha cargado
  
  progress = 0;//Usando para la loadingPorgressBar

  public adjuntado = false; //Bandera para saber si han adjuntado datos de consulta



  constructor(
    private toastr: ToastrService,
    private _consultaService: ConsultaService,
    private _pacienteService: PacienteService,
    private loadingBarService: LoadingBarService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this.loadingBarService.start();
    this.cargarPaciente();
    //console.log(this.consulta.fechaConsul);
  }



  //Aqui se reciben los datos de consulta del componente hijo (datos-consulta)
  addDatosConsulta(datosConsulta){
      var signosVitales = {
        peso: datosConsulta.peso,
        talla: datosConsulta.talla,
        temperatura: datosConsulta.temperatura,
        presionArterial: datosConsulta.presionArt,
        frecuenciaCardiaca: datosConsulta.freCardia,
        indiceMC: datosConsulta.indiceMC
      };

      var tiempoSintomas = datosConsulta.tiemSintomas.tiempo+" "+datosConsulta.tiemSintomas.lapso;
      
      this.consulta = new Consulta(
        datosConsulta.paciente,
        datosConsulta.motivo,
        tiempoSintomas,
        datosConsulta.fechaConsul,
        datosConsulta.historia,
        datosConsulta.antePatol,
        datosConsulta.alergias,
        signosVitales,
        datosConsulta.diagnostico
      );

      //Se activa el boton de guardar consulta
      this.adjuntado = true;

      //Se activa la alerta
      this.showInfo('Se han adjuntado datos de consulta!','Consulta médica');

  }

  addRecetaMedica(recetaMedica){
      
    //Solo si ya se obtuvieron datos de consulta, se podrá adjuntar una receta
      if(this.adjuntado){
        this.consulta.setReceta(recetaMedica);
        //Se activa la alerta
         this.showInfo('Se ha adjuntado una receta médica!','Receta médica');
        //console.log('Receta recibida: ', this.consulta);
      }else{
        //Mensaje de alert que mencione al usuario que primero debe brindar datos de consulta
        this.adjuntarDatos.fire();
      }
  }

  
  onSubmit() {
    
    console.log(this.consulta);
    /*this.loadingBarService.start();
    this.progress = 30;

    if (this.consulta != null) {
   
      this.progress = 50;
      
      this._consultaService.create(this.consulta).subscribe(
        response => {
          this.progress = 100;
          //console.log(this.consulta=response.consulta);
          if (response.status == "success") {
            this.loadingBarService.complete();
            this.status = "success";
            this.consulta = response.consulta;

            //Alert
            this.redireccionSwal.fire();
          } else {
            this.loadingBarService.complete();
            console.log("else");
            this.status = "error";
            this.errorSwal.fire();
          }
        },
        error => {
          console.log("error");
          console.log(error);
          this.loadingBarService.complete();
          this.status = "error";
          this.errorSwal.fire();
        }
      );
    }*/

    //f.resetForm();
    //this.limpiarCampos();
  }


  cargarPaciente() {
    this._route.params.subscribe((params) => {
      this.idpa = params["id"];

      this._pacienteService.getPaciente(this.idpa).subscribe(
        (response) => {
          //console.log('Paciente: ',response);
          this.eventsSubject.next(response); // propagando el evento al componente hijo
          //Para mientras mandan del backend OJO <---------
          this.paciente = new Paciente(
            response.paciente.nombre,
            response.paciente.apellidos,
            response.paciente.fechaNac,
            response.paciente.gen,
            response.paciente.telefono,
            response.paciente.encargado,
            response.paciente.parentesco,
            response.paciente.faContacto,
            response.paciente.telFaContacto,
            response.paciente.direccion,
            '',
            '',
            response.paciente.otrosDatos,
            response.paciente.codigo,
            response.paciente._id
          );
       
          this.edad = this.obtenerEdad(
            new Date(),
            new Date(this.paciente.fechaNac)
          );
          this.edadAnios = this.edad + " Años";
          if(this.paciente.gen === 'M'){
              this.genero = "MASCULINO";
          }else{
            this.genero = "FEMENINO"
          }
          this.nomPaciente = this.paciente.nombre + " " + this.paciente.apellidos;
          this.numeroExpediente = this.paciente.codigo;
          console.log(response);
          this.loadingBarService.complete();
        },
        (error) => {
          console.log("nadaaa " + error);
          //this._router.navigate(['/home']);
        }
      );
    });
  }


 

  inicializarFechaConsulP(fechaConsulP) {
    var fechaCon = new Date(fechaConsulP);
    //console.log(fechaCon);
    var dd = fechaCon.getDate();
    var mm = fechaCon.getMonth() + 1; //January is 0!
    var yyyy = fechaCon.getFullYear();

    var dia = dd.toString();
    if (dd < 10) {
      dia = "0" + dd;
    }
    var mes = mm.toString();
    if (mm < 10) {
      mes = "0" + mm;
    }
    //console.log(yyyy + "-" + mes + "-" + dia);
    return yyyy + "-" + mes + "-" + dia;
  }

  obtenerEdad(fechaActual, fechaNac) {
    let diaActual = fechaActual.getDate();
    let mesActual = fechaActual.getMonth() + 1;

    let mesNac = fechaNac.getMonth() + 1;
    let diaNac = fechaNac.getDate();

    //Calculando edad relativa
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (mesActual < mesNac) {
      edad--;
    }
    if (mesNac == mesActual && diaActual < diaNac) {
      edad--;
    }

    return edad;
  } // fin del metodo de calculo de edad

  //Para confirmar la consulta medica
  confirmar(){
    this.confirmarSwal.fire();//lanzando la alerta

      //Esperando por confirmación
      this.confirmarSwal.confirm.subscribe(res => {

        //Si se confirma
        if(res){
          //continua el proceso de registrar la consulta
          this.onSubmit();
        }
      });
  }

  redireccionar() {
    this._router.navigate(["/expedientes/"]);
  }


  // Alerta cuando se adjunten datos de consulta
  showInfo(mensaje: string, titulo: string) {
    this.toastr.info(mensaje, titulo);
  }

  
}

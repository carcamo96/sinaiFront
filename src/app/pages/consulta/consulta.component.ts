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
  public edadMeses: number; //Para guardar la edad en meses
  public genero: string;//Para colocar el genero en toda su palabra
  public mostrarEdad: string;//Para mostrar edad + "Años"
  public numeroExpediente: string = ''; //Para mostrar el numero de expediente

  public ayuda = false; //Para manejar la ayuda

  public paciente: Paciente; //Objeto que mapea los datos del paciente para manejarlos con POO
  public idpa: string; //Maneja el id del paciente que se ha cargado
  
  progress = 0;//Usando para la loadingPorgressBar
  progressData = 10; //Usando para la ngb-progressbar

  public adjuntado = false; //Bandera para saber si han adjuntado datos de consulta
  public recetaAdjuntado = false; //Bandera para saber si han adjuntado una receta
  public estudios = false; //Bandera para saber si se realizaran estudios de esta consulta



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

      //Concatenando tiempo de sintomas
      var tiempoSintomas = datosConsulta.tiemSintomas.tiempo+" "+datosConsulta.tiemSintomas.lapso;
      
      let edadAlaFecha = '';
      //Calculando edad a la fecha
      if(this.edad > 0){
        edadAlaFecha = this.edad+" Año/s";
      }else{
        edadAlaFecha = this.edadMeses+" Mes/es"
      }


      this.consulta = new Consulta(
        datosConsulta.paciente,
        datosConsulta.motivo,
        tiempoSintomas,
        datosConsulta.fechaConsul,
        edadAlaFecha,
        datosConsulta.historia,
        datosConsulta.antePatol,
        datosConsulta.temperatura,
        datosConsulta.freCardia,
        datosConsulta.freRespiratoria,
        datosConsulta.peso,
        datosConsulta.talla,
        datosConsulta.indiceMC,
        datosConsulta.presionSistolica,
        datosConsulta.presionDiastolica,
        datosConsulta.presionArt,
        datosConsulta.perimetroCefalico,
        datosConsulta.circunferenciaAbdominal,
        datosConsulta.alergias,
        datosConsulta.examenFisico,
        datosConsulta.fechaCitologia,
        datosConsulta.observacionCitologia,        
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
        this.recetaAdjuntado = true;
        //Se activa la alerta
         this.showInfo('Se ha adjuntado una receta médica!','Receta médica');
         //console.log('Receta recibida: ', this.consulta);
      }else{
        //Mensaje de alert que mencione al usuario que primero debe brindar datos de consulta
        this.adjuntarDatos.fire();
      }
  }

  //Para confirmar la consulta medica
  confirmar(){
    
      this.onSubmit();
  }

  onSubmit() {

   
    this.loadingBarService.start();
    this.progress = 30;

    if (this.consulta != null) {
   
      this.progress = 50;
      
      this._consultaService.create(this.consulta).subscribe(
        response => {
          this.progress = 100;
          console.log(response);
          if (response.status == "success") {
            this.loadingBarService.complete();
            //this.status = "success";
            this.consulta = response.consulta;

            //Alert
            this.redireccionSwal.fire();
          } else {
            this.loadingBarService.complete();
            console.log("else");
            //this.status = "error";
            this.errorSwal.fire();
          }
        },
        error => {
          console.log("error");
          console.log(error);
          this.loadingBarService.complete();
          //this.status = "error";
          this.errorSwal.fire();
        }
      );
    }

  }


  cargarPaciente() {
    this._route.params.subscribe((params) => {
      this.idpa = params["id"];
      this.progressData = 30;//Avanza 30% la barra de progreso
      this._pacienteService.getPaciente(this.idpa).subscribe(
        (response) => {
          //console.log('Paciente: ',response);
          this.eventsSubject.next(response); // propagando el evento al componente hijo
          this.progressData = 70; //Avanza 70% la barra de progreso
          setTimeout(() => { //Para simular carga de datos
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
  
            if(this.edad <= 0){
                this.mostrarEdad = this.edadMeses + " Mes/es";
            }else{
  
              this.mostrarEdad = this.edad + " Año/s";
            }
            if(this.paciente.gen === 'M'){
                this.genero = "MASCULINO";
            }else{
              this.genero = "FEMENINO"
            }
            this.nomPaciente = this.paciente.nombre + " " + this.paciente.apellidos;
            this.numeroExpediente = this.paciente.codigo;
            //console.log(response);
            this.loadingBarService.complete();
            this.progressData = 100; //Avanza 100% la barra de progreso se completa
          }, 2000); //Fin del setTimeOut
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

    if(edad <= 0){//Cambiando la edad a meses
        let meses = mesActual - mesNac;
        this.edadMeses = meses;
    }

    return edad;
  } // fin del metodo de calculo de edad


  activarPopovers(){
    this.ayuda = !this.ayuda;
  }

  redireccionar() {
    this._router.navigate(["/expedientes/"]);
  }


  // Alerta cuando se adjunten datos de consulta
  showInfo(mensaje: string, titulo: string) {
    this.toastr.info(mensaje, titulo);
  }

  
}

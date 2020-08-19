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

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
  providers: [ConsultaService, PacienteService],
})
export class ConsultaComponent implements OnInit {
  @ViewChild("redireccionSwal") private redireccionSwal: SwalComponent;
  @ViewChild("errorSwal") private errorSwal: SwalComponent;

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [{ titulo: "Home", link: "/admin" }, {titulo: "Expedientes", link: "/admin/expedientes"}];

  public nomPaciente: string;
  public atl = Date.now();
  public status: string;
  public consulta: any;
  public spinnStatus: boolean;
  public paciente: Paciente;
  public indice: string;
  public idpa: string;
  public edad: number;
  public fechaAux = "";
  public ayuda = false;

  genEdad = '';

  progress = 0;

  constructor(
    private toastr: ToastrService,
    private _consultaService: ConsultaService,
    private _pacienteService: PacienteService,
    private loadingBarService: LoadingBarService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.consulta = {
      paciente: "",
      fechaCre: "02/06/2010",
      indiceMC: "",
      motivo: "",
      tiemSintoma: "",
      fechaConsul: "",
      historia: "",
      antePatol: "",
      alergias: "",
      peso: "",
      talla: "",
      temperatura: "",
      presionArt: "",
      freCardia: "",
      diagnostico: "",
    };
    this.consulta.fechaConsul = this.inicializarFechaConsulP(this.atl);
    //this.consulta.fechaConsul= new Date(this.consulta.fechaConsul);

    this.inicializarFechaActual();
  }

  ngOnInit() {
    this.loadingBarService.start();
    this.cargarPaciente();
    //console.log(this.consulta.fechaConsul);
  }

  onSubmit(f: NgForm) {
    this.loadingBarService.start();
    this.progress = 30;

    if (f.valid) {
      let consulta = new Consulta(
        this.idpa,
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
        this.consulta.fechaCre,
        this.consulta.diagnostico
      );
      this.progress = 50;
      console.log(consulta);
      this._consultaService.create(consulta).subscribe(
        (response) => {
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
        (error) => {
          console.log("error");
          console.log(error);
          this.loadingBarService.complete();
          this.status = "error";
          this.errorSwal.fire();
        }
      );
    }
    f.resetForm();
    this.limpiarCampos();
  }

  spnChange() {
    this.spinnStatus = true;
  }

  // Alerta de exito
  showSuccess(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo);
  }

  //Inicializar fecha actual en el date picker
  inicializarFechaActual() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      var dia = dd.toString();
      dia = "0" + dd;
    }
    if (mm < 10) {
      var mes = mm.toString();
      mes = "0" + mm;
    }

    this.fechaAux = yyyy + "-" + mes + "-" + dia;
  }

  limpiarCampos() {
    this.consulta = {
      motivo: "",
      tiemSintoma: "",
      fechaConsul: "",
      historia: "",
      antePatol: "",
      alergias: "",
      peso: "",
      talla: "",
      temperatura: "",
      presionArt: "",
      freCardia: "",
      indiceMC: "",
    };
  }

  showError(mensaje: string, titulo: string) {
    this.toastr.error(mensaje, titulo, {
      progressBar: true,
      progressAnimation: "decreasing",
    });
  }

  cargarPaciente() {
    this._route.params.subscribe((params) => {
      this.idpa = params["id"];

      this._pacienteService.getPaciente(this.idpa).subscribe(
        (response) => {
          //console.log(response);
          this.paciente = response.paciente;
          this.edad = this.obtenerEdad(
            new Date(),
            new Date(this.paciente.fechaNac)
          );
          
          if(this.paciente.gen === 'M'){
            this.genEdad = this.edad + " años - MASCULINO";
          }else{
            this.genEdad = this.edad + " años - FEMENINO";
          }
          this.paciente.nombre = response.paciente.nombre + " " + response.paciente.apellidos;
            this.loadingBarService.complete();
        },
        (error) => {
          console.log("nadaaa " + error);
          //this._router.navigate(['/home']);
        }
      );
    });
  }

  cal(event) {
    var pesoP = event;

    this.indice = pesoP;
  }

  cal2(event) {
    var tallaP = event;
    var pes = +this.indice;
    let indice;
    if (tallaP != null || this.consulta.talla != null) {
      indice = pes / Math.pow(tallaP, 2);
      this.indice = "" + indice;
    } else {
      this.indice = "" + 0;
    }
  }

  cal3() {
    var pes = parseFloat(this.consulta.peso);
    var tall = parseFloat(this.consulta.talla);
    if (tall != 0 || tall != null || tall != Infinity) {
      let indice = pes / Math.pow(tall, 2);
      this.indice = "" + parseFloat("" + indice).toFixed(1);
      this.consulta.indiceMC = this.indice;
    } else {
      //this.indice = '';
    }
  }

  inicializarFechaConsulP(fechaConsulP) {
    var fechaCon = new Date(fechaConsulP);
    console.log(fechaCon);
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
    console.log(yyyy + "-" + mes + "-" + dia);
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

  esMenor() {
    return this.edad >= 0 && this.edad < 15;
  }

  redireccionar() {
    this._router.navigate(["/expedientes/"]);
  }

  //Para activar la ayuda del formulario
  activarPopovers(p1, p2, p3) {
    this.ayuda = !this.ayuda;

    if (this.ayuda == false) {
      p1.close();
      p2.close();
      p3.close();
    }
  }
  //Para activar un popover X cuando el campo tenga el foco
  popFocus(px, pxAnterior?) {
    px.open();
    if (pxAnterior) {
      pxAnterior.close();
    }
  }
}

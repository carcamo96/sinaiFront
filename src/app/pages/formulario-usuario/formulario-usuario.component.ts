import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { NgForm, FormControl, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario";

import { LoadingBarService } from "@ngx-loading-bar/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Subject, Observable } from "rxjs";
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: "app-formulario-usuario",
  templateUrl: "./formulario-usuario.component.html",
  styleUrls: ["./formulario-usuario.component.css"],
  providers: [UsuarioService],
})
export class FormularioUsuarioComponent implements OnDestroy, OnInit {

  @ViewChild("redireccionSwal") private redireccionSwal: SwalComponent;
  @ViewChild("errorSwal") private errorSwal: SwalComponent;

  @ViewChild("redireccionSwalMod") private redireccionSwalMod: SwalComponent;
  @ViewChild("errorSwalMod") private errorSwalMod: SwalComponent;

  @ViewChild("redireccionSwalDel") private redireccionSwalDel: SwalComponent;
  @ViewChild("errorSwalDel") private errorSwalDel: SwalComponent;

  @ViewChild("myimg") elementView: ElementRef;

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [{ titulo: "Home", link: "/admin/home" }];

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @Input() events: Observable<any>;

  public usuario: Usuario;
  public usuarios: any[] = [];
  public pas: string;
  public valPass: boolean;
  public minPass: boolean;
  public progress = 0;
  public isEdit = false;
  private idU;

  constructor(
    private _usuarioService: UsuarioService,
    private loadingBarService: LoadingBarService
  ) {
    this.usuario = {
      usuario: "",
      rol: "",
      pass: "",
      fechaRegistro: new Date(Date.now()),
    };
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      processing: true,
    };
    this.getUsuarios();
  }

  onSubmit(f: NgForm) {
    this.loadingBarService.start();
    this.progress = 30;

    if (f.valid) {
      //Creando el usuario
      let usuario = new Usuario(
        this.usuario.usuario,
        this.usuario.pass,
        this.usuario.rol,

        new Date(Date.now())
      );
        //console.log(usuario);
      this.progress = 50;
      
        this._usuarioService.create(usuario).subscribe(
          (response) => {
            this.progress = 100;
            console.log(response.usuario);
            if (response.status == "success") {
              this.loadingBarService.complete();
              this.usuario = response.usuario;
              //Se registro correctamente
              this.redireccionSwal.fire();
            } else {
              this.loadingBarService.complete();
              console.log("else");
              this.errorSwal.fire();
            }
          },
          (error) => {
            console.log("error");
            console.log(error);
            this.loadingBarService.complete();
            this.errorSwal.fire();
          }
        );
      }
      this.usuario = null; //Limpia la el objeto auxiliar
      f.reset();//Refresca el formulario
  }

  onSubmit2(f: NgForm) {
    this.loadingBarService.start();
    this.progress = 30;

    if (f.valid) {
      let usuario = new Usuario(
        this.usuario.usuario,
        this.usuario.pass,
        this.usuario.rol,

        new Date(Date.now())
      );
      //console.log(usuario);
      this.progress = 50;
      console.log(this.idU);
      this._usuarioService.update(this.idU, usuario).subscribe((response) => {
        if (response.status == "Success") {
          this.loadingBarService.complete();
          this.usuario = response.usuario;
          this.isEdit = false;
          //El registro fue editado con exito
          this.redireccionSwalMod.fire();
        } else {
          this.loadingBarService.complete();
          console.log("else", response);
          this.errorSwalMod.fire();
        }
      });
      
    }
    f.reset();//limpia el formulario de edición
  }

  validarPass() {
    if (this.usuario.pass === this.pas) {
      this.valPass = true;
    } else {
      this.valPass = false;
    }
  }

  passLgth() {
    const control = new FormControl(this.usuario.pass, Validators.minLength(8));
    this.minPass = control.invalid;
    console.log(control.invalid);
  }

  //Carga los usuarios que se muestran en la tabla
  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(
      (response) => {
        console.log(response.usuarios);
        if (response.status == "success") {
          this.usuarios = response.usuarios;
          this.dtTrigger.next();//Para refrescar la tabla
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Cuando se clickea el boton de editar
  llenarCampos(id) {
    this.isEdit = true;//Cambia bandera a true para mostrar el formulario de edición 
    this._usuarioService.getUsuario(id).subscribe(
      (response) => {
        if (response.status == "success") {
          //console.log(response);
          this.idU = response.usuario._id;
          //console.log(this.idU);
          this.usuario = response.usuario;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  eliminarUsuario(id) {
    this.loadingBarService.start();
    this.progress = 50;
    //Alert
    this.redireccionSwalDel.fire();
    //console.log(this.redireccionSwalDel.cancel);
    this.redireccionSwalDel.confirm.subscribe((res) => {
      //console.log(res);
      if (res == true) {
        this._usuarioService.delete(id).subscribe(
          (response) => {
            this.progress = 100;
            if (response.status == "success") {
              //this.getUsuarios();
              this.loadingBarService.complete();
              //this.usuario = response.usuario;
              this.refrescarTabla();
            }
          },
          (err) => {
            console.log(err);
            this.loadingBarService.complete();
            this.errorSwalDel.fire();
          }
        );
      } else {
        this.loadingBarService.complete();
        this.errorSwalDel.fire();
        console.log("else");
      }
      this.loadingBarService.complete();
    });
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dtTrigger.unsubscribe();
  }


  refrescarTabla(){
    this.ngOnInit();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      //this.dtTrigger.next();
    });
  }
}


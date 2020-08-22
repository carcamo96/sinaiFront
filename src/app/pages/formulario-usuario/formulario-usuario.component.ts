import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  OnDestroy,
  ViewChildren,
  QueryList
} from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { NgForm, FormControl, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario";

import { LoadingBarService } from "@ngx-loading-bar/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Subject, Observable } from "rxjs";
import { DataTableDirective } from 'angular-datatables';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: "app-formulario-usuario",
  templateUrl: "./formulario-usuario.component.html",
  styleUrls: ["./formulario-usuario.component.css"],
  providers: [UsuarioService],
})
export class FormularioUsuarioComponent implements OnDestroy, OnInit {

  @ViewChild("redireccionSwal") private redireccionSwal: SwalComponent;
  @ViewChild("errorSwal") private errorSwal: SwalComponent;

  @ViewChild("confirmSwalMod") private confirmSwalMod: SwalComponent;
  @ViewChild("redireccionSwalMod") private redireccionSwalMod: SwalComponent;
  @ViewChild("errorSwalMod") private errorSwalMod: SwalComponent;

  @ViewChild("redireccionSwalDel") private redireccionSwalDel: SwalComponent;
  @ViewChild("errorSwalDel") private errorSwalDel: SwalComponent;

  @ViewChild("myimg") elementView: ElementRef;

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [{ titulo: "Home", link: "/admin/home" }];

  @ViewChildren(DataTableDirective) dtElements: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @Input() events: Observable<any>;

  public usuario: any;
  public usuarios: any[] = [];
  public usuariosIn: any[] = [];
  public pas: string;
  public valPass: boolean;
  public minPass: boolean;
  public progress = 0;
  public isEdit = false;
  private idU;

  key: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string;

  request: string;
  responce: string;

  constructor(
    private _usuarioService: UsuarioService,
    private loadingBarService: LoadingBarService
  ) {
    this.defaultUserValues();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      processing: true,
    };
    
    this.getUsuarios();
  }

  defaultUserValues(){
    this.usuario = {
      usuario: "",
      rol: "Administrador",
      pass: "",
      fechaRegistro: new Date(Date.now()),
      estado:"activo"
    };
  }

  onSubmit(f: NgForm) {
    this.loadingBarService.start();
    this.progress = 30;

    if (f.valid) {
      //Creando el usuario
      this.encryptPass(this.usuario.pass);
      console.log(this.encrypted);
      let usuario = new Usuario(
        this.usuario.usuario,
        this.encrypted,
        this.usuario.rol,

        new Date(Date.now()),
        this.usuario.estado
      );
        //console.log(usuario);
      this.progress = 50;
      
        this._usuarioService.create(usuario).subscribe(
          (response) => {
            this.progress = 100;
            console.log(response.usuario);
            if (response.status == "success") {
              this.loadingBarService.complete();
              this.estado(response.usuario._id, usuario.estado);
              this.usuario = response.usuario;
              //Se registro correctamente
              this.redireccionSwal.fire();
              this.defaultUserValues();
            } else {
              this.loadingBarService.complete();
              console.log("else");
              this.errorSwal.fire();
              this.defaultUserValues();
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

  //Solo para confirmar la edicion y separa logica
  editarRegistro(f: NgForm){
    this.loadingBarService.start();
    this.progress = 30;

    this.confirmSwalMod.fire();//lanzando la alerta
    //Esperando por confirmación
    this.confirmSwalMod.confirm.subscribe((res) =>{
      //Si se confirma
        if(res == true){
          //continua el proceso de modificación 
            this.onSubmit2(f);
        }

    });
  }

  onSubmit2(f: NgForm) {
    this.encrypted = "";
    this.encryptPass(this.usuario.pass);
    if (f.valid) {
      let usuario = new Usuario(
        this.usuario.usuario,
        this.encrypted,
        this.usuario.rol,

        new Date(Date.now()),
        this.usuario.estado
      );
      //console.log(usuario);
      this.progress = 50;
      //console.log(this.idU);
      this._usuarioService.update(this.idU, usuario).subscribe((response) => {
        if (response.status == "Success") {
          this.loadingBarService.complete();
          this.defaultUserValues();//Para limpiar el formulario de modificación        
          
          this.estado(response.usuario._id,usuario.estado);
         
          //El registro fue editado con exito
          this.redireccionSwalMod.fire();
        } else {
          this.loadingBarService.complete();
          console.log("else", response);
          this.errorSwalMod.fire();
        }
        this.isEdit = false;
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
          let users:any[]=[];
          let users2:any[]=[];
          this.usuarios.filter(f=>{
            if(f.estado == 'activo'){
              users.push(f);
            }if (f.estado == 'inactivo') {
              users2.push(f);
            }
          });
          this.usuarios=users;
          this.usuariosIn=users2;
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
    let usuario: Usuario;
    this.isEdit = true;//Cambia bandera a true para mostrar el formulario de edición 
    this._usuarioService.getUsuario(id).subscribe(
      (response) => {
        if (response.status == "success") {
          //console.log(response);
          this.idU = response.usuario._id;
          //console.log(this.idU);
          this.decryptPass(response.usuario.pass)
          this.pas=this.decrypted;
          this.usuario = {
            id:response.usuario._id,
            usuario:response.usuario.usuario,
            pass: this.decrypted,
            rol:response.usuario.rol,
            fechaRegistro:response.usuario.fechaRegistro,
            estado:response.usuario.estado
          };
          console.log(this.usuario.pass);
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
    this.dtElements.forEach((dtElement: DataTableDirective)=>{ 
    dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      //this.dtTrigger.next();
    });
  });
  }

  encryptPass(pass: string) {
    let _key = CryptoJS.enc.Utf8.parse(this.key);
    let _iv = CryptoJS.enc.Utf8.parse(this.key);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(pass), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    this.encrypted = encrypted.toString();
  }
  decryptPass(pass: string) {
    let _key = CryptoJS.enc.Utf8.parse(this.key);
    let _iv = CryptoJS.enc.Utf8.parse(this.key);

    this.decrypted = CryptoJS.AES.decrypt(
      pass, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }

  estado(id, estado){
    this._usuarioService.updateEstado(id, estado).subscribe(
      response => {
        if (response.status=='success') {
          console.log('exito');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}


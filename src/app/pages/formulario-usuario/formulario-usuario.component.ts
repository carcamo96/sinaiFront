import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Renderer2,
  ElementRef,
} from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { NgForm, FormControl, Validators } from "@angular/forms";
import { UsuarioService } from "../../services/usuario";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { Subject, Observable } from "rxjs";

@Component({
  selector: "app-formulario-usuario",
  templateUrl: "./formulario-usuario.component.html",
  styleUrls: ["./formulario-usuario.component.css"],
  providers: [UsuarioService],
})
export class FormularioUsuarioComponent implements OnInit {
  @ViewChild("redireccionSwal") private redireccionSwal: SwalComponent;
  @ViewChild("errorSwal") private errorSwal: SwalComponent;

  @ViewChild("redireccionSwalMod") private redireccionSwalMod: SwalComponent;
  @ViewChild("errorSwalMod") private errorSwalMod: SwalComponent;

  @ViewChild("redireccionSwalDel") private redireccionSwalDel: SwalComponent;
  @ViewChild("errorSwalDel") private errorSwalDel: SwalComponent;

  @ViewChild('contraUsuario', { read: ElementRef }) passwordEye: ElementRef;
// Seleccionamos el elemento con el nombre que le pusimos con el #

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [{ titulo: "Home", link: "/admin/home" }];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  passwordTypeInput  =  'password';
  public usuario: Usuario;
  public tablaUser: any[] = [];
  public usuarios: any[] = [];
  public pas: string;
  public valPass: boolean;
  public minPass: boolean;
  public progress = 0;
  public isEdit = false;
  public model2: any = {};
  private idU;

  constructor(
    private _usuarioService: UsuarioService,
    private loadingBarService: LoadingBarService
  ) {
    this.usuario = {
      _id:"",
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
      let usuario = new Usuario('',
        this.usuario.usuario,
        this.usuario.pass,
        this.usuario.rol,

        new Date(Date.now())
      );
      console.log(usuario);
      this.progress = 50;
      
        this._usuarioService.create(usuario).subscribe(
          (response) => {
            this.progress = 100;
            console.log(response.usuario);
            if (response.status == "success") {
              this.loadingBarService.complete();
              this.usuario = response.usuario;
              this.usuarios.push(this.usuario);
              this.updateUsers();
              this.dtTrigger.next(this.usuarios);
              //Alert
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
      //this.usuario = null;
      f.reset();
  }

  onSubmit2(f: NgForm) {
    this.loadingBarService.start();
    this.progress = 30;

    if (f.valid) {
      let usuario = new Usuario('',
        this.usuario.usuario,
        this.usuario.pass,
        this.usuario.rol,

        new Date(Date.now())
      );
      console.log(usuario);
      this.progress = 50;
      console.log(this.idU);
      this._usuarioService.update(this.idU, usuario).subscribe((response) => {
        this.progress=100;
        if (response.status == "Success") {
          this.loadingBarService.complete();
          this.usuario = response.usuario;
          //this.usuarios.push(this.usuario);
          this.updateUsers();
          this.isEdit = false;
          //Alert
          this.redireccionSwalMod.fire();
        } else {
          this.loadingBarService.complete();
          //console.log("else", response);
          this.errorSwalMod.fire();
        }
      },
      err=>{
        console.log(err);
        this.loadingBarService.complete();
        this.errorSwal.fire();
      }
      );
      
    }
    //this.usuario=null;
    f.reset();
  }
 

  updateUsers():void {
    //this.getUsuarios();
    console.log(this.usuarios);
    this.usuarios.forEach(v => {
      console.log(this.usuario._id);
      if (v._id==this.usuario._id) {
        v.usuario=this.usuario.usuario;
        v.pass=this.usuario.pass;
        v.rol=this.usuario.rol;
        v.fechaRegistro=this.usuario.fechaRegistro;
        console.log('correcto', v);
      }else{
        console.log('else');
      }
    });
    
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

  getUsuarios() {
    this._usuarioService.getUsuarios().subscribe(
      (response) => {
        console.log(response.usuarios);
        if (response.status == "success") {
          this.usuarios = response.usuarios;
          this.tablaUser = this.usuarios;
          this.dtTrigger.next();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  llenarCampos(id) {
    this.isEdit = true;
    this._usuarioService.getUsuario(id).subscribe(
      (response) => {
        if (response.status == "success") {
          console.log(response);
          this.idU = response.usuario._id;
          console.log(this.idU);
          this.usuario = response.usuario;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  eliminarUsuario(id,i) {
    this.loadingBarService.start();
    this.progress = 50;
    //Alert
    this.redireccionSwalDel.fire();
    console.log(this.redireccionSwalDel.cancel);
    this.redireccionSwalDel.confirm.subscribe((res) => {
      console.log(res);
      if (res == true) {
        this._usuarioService.delete(id).subscribe(
          (response) => {
            this.progress = 100;
            if (response.status == "success") {
              this.loadingBarService.complete();
              //this.usuario = response.usuario;
              let users:any[]=[];
              this.usuarios.forEach(v => {
                if (v._id===this.idU) {
                  
                }else{users.push(v);}
              });
              
              users.splice(i,1);
              console.log(users);
               this.usuarios=users;
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
    this.loadingBarService.complete();
  }

  mostrarPassword() {
    //cambiar tipo input
this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
   //obtener el input
   const nativeEl = this.passwordEye.nativeElement.querySelector('input');
   //obtener el indice de la posición del texto actual en el input
   const inputSelection = nativeEl.selectionStart;
   //ejecuto el focus al input
   nativeEl.focus();
  //espero un milisegundo y actualizo la posición del indice del texto
   setTimeout(() => {
       nativeEl.setSelectionRange(inputSelection, inputSelection);
   }, 1);

}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dtTrigger.unsubscribe();
  }
}

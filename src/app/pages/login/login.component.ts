import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //variable auxiliar para capturar los datos
  public usuario: any; 

  constructor() { 
    this.usuario = {
      usuario: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  logear(){
    console.log(this.usuario);
  }


}

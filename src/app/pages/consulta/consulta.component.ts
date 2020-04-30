import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
//Importando la clase para manejar las alertas toastr para angular
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

//Se le pasan los titulos y los links de las paginas que preseden esta pagina
public breads: any[] = [
  {titulo: 'Home', link: '/home'}
];


public nomPaciente: string;
public atl = new Date();

public consulta: any;

  constructor(private toastr: ToastrService) { 
    this.nomPaciente = "";


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
    this.consulta.fechaConsul=this.atl.toLocaleDateString() +' '+ this.atl.toLocaleTimeString();
  }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    console.log(f.value);
    this.showSuccess("Se ha realizado una nueva consulta", "Nueva consulta");
}

  // Alerta de exito
  showSuccess(mensaje: string, titulo: string) {
    this.toastr.success(mensaje, titulo);
  }

}

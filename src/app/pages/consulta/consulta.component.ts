import { Component, OnInit } from '@angular/core';

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

public consulta: any;
public nomPaciente: string;
public atl = new Date();
  constructor() { 
    this.nomPaciente = "Denny Romero";
    this.consulta = {
      motivo: '',
      tiemSintoma: '',
      fechaConsul: '',
      historia: '',
      antePatol: '',
      alergias: ''
    }
    this.consulta.fechaConsul=this.atl.toLocaleDateString() +' '+ this.atl.toLocaleTimeString();
  }

  ngOnInit(): void {
  }

  onSubmit(){
    
  }

}

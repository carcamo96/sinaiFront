import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.css']
})
export class FormularioPacienteComponent implements OnInit {

  //Se le pasan los titulos y los links de las paginas que preseden esta pagina
  public breads: any[] = [
    {titulo: 'Home', link: '/home'}
  ];

  public paciente: any;

  constructor(private cdRef:ChangeDetectorRef) {

        this.paciente = {

          nombre: '',
          apellidos: '',
          fechaNac: '',
          edad: '',
          gen: 'M',
          telefono: '',
          encargado: '',
          parentesco: '',
          faContacto: '',
          telFaContacto: '',
          direccion: '',
          otrosDatos: ''

        };
  }

  ngOnInit(): void {
  }

  onSubmit(){
      console.log(this.paciente);
  }

  actualizar(event){
    this.cdRef.detectChanges();
  }

}

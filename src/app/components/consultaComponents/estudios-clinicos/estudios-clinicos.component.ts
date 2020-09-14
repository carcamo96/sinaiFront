import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudios-clinicos',
  templateUrl: './estudios-clinicos.component.html',
  styleUrls: ['./estudios-clinicos.component.css']
})
export class EstudiosClinicosComponent implements OnInit {

  //Arreglo de objetos del catálogo de estudios clinicos temporal, porque los estudios es un mantenimiento a parte
  estudiosClinicos = [
    {
      nombre: "HEMATOLOGÍA",
      estudios : [
        "Hemograma", 
        "Ht - Hb", 
        "Leucograma",
        "Plaquetas",
        "Hemograma - Plaquetas",
        "Eritrosedimentación",
        "Frotis de sangre periférica",
        "Reticulositos",
        "Células Falsiformes",
        "Células LE",
        "Concentrado de Strout (T. Cruzi)"
      ]
    },
    {
      nombre: "ELECTROLITOS",
      estudios : [
        "Sodio", 
        "Potasio", 
        "Cloro",
        "Calcio",
        "Fósforo",
        "Magnesio"
      ]
    },
    {
      nombre: "BACTEREOLOGÍA",
      estudios : [
        "Urocultivo", 
        "Coprocultivo", 
        "Cultivo de Secreciones:__",
        "Hemocultivo",
        "Cultivo Faringeo",
        "Cultivo Nasal",
        "Cultivo de Oído:__",
        "Cultivo de Oído:__",
        "KDH",
        "Cultivo de BAAR",
        "Directo de Secreción",
        "Coloración de Gram"
      ]
    },
    {
      nombre: "ENDOCRINOLOGÍA",
      estudios : [
        "T3 Total", 
        "T4 Total", 
        "TSH",
        "T3 Libre",
        "T4 Libre",
        "TSH Ultrasensible (3ra. Gen)",
        "Insulina",
        "Insulina Post Pandrial",
        "Testosterona",
        "Prolactina",
        "FSH",
        "LH",
        "Gonad Coriónica hcg - cuartil",
        "Hormona paratorides",
        "Hormona del Crecimiento",
        "Cortisol_am_pm",
        "Progesterona"
      ]
    }

  ];

  estudiosSeleccionados = [];

  constructor() { }

  ngOnInit(): void {
  }

}

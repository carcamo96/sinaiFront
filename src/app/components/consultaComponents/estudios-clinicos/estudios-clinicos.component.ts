import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudios-clinicos',
  templateUrl: './estudios-clinicos.component.html',
  styleUrls: ['./estudios-clinicos.component.css']
})
export class EstudiosClinicosComponent implements OnInit {

  //Para paginacion de ngx-pagination
  p: number = 1;

  //Arreglo de objetos del catálogo de estudios clinicos temporal, porque los estudios es un mantenimiento a parte
  estudiosClinicos = [
    {
      nombre: "QUÍMICA CLÍNICA",
      estudios : [
        "Gluscosa", 
        "Glucosa 2H Post-Pandrial", 
        "Glucosa Tolerancia horas",
        "Test de O'Sullivan",
        "Hemoglobina Glicosilada A1C",
        "Colesterol",
        "Triglicéridos",
        "Ácido Úrico",
        "Creatinina",
        "Nitrogeno Ureico",
        "Colesterol HDL",
        "Colesterol LDL",
        "Proteinas Totales relación A/G",
        "Albumina",
        "TGO",
        "TGP",
        "Bilirrubinas",
        "Globulina",
        "Lipasa",
        "(CPK) Creatin Fosfoquinasa",
        "(CPK). MB Creatin Fosfoquinasa",
        "LDH (Deshidrogenasa Láctica)",
        "Hierro Serico",
        "Hierro Capacidad de Fijación",
        "Transferrina",
        "Ferritina"
      ]
    },
    {
      nombre: "PERFIL RUTINARIO",
      estudios : [
        "Hemograma", 
        "Glucosa", 
        "Colesterol",
        "Triglicéridos",
        "Ácido Úrico",
        "Creatinina",
        "Ex. General de Orina",
        "Ex. General de Heses"
      ]
    },
    {
      nombre: "PERFIL RUTINARIO N° 2",
      estudios : [
        "Hemograma", 
        "Glucosa", 
        "Colesterol",
        "Triglicéridos",
        "Ácido Úrico",
        "Creatinina",
        "Nitrogeno Ureico",
        "TGO",
        "TGP",
        "Ex. General de Orina",
        "Ex. General de Heses"
      ]
    },
    {
      nombre: "PERFIL PRENATAL",
      estudios : [
        "Hemograma", 
        "Glucosa", 
        "Tipeo Sanguineo",
        "VDHL",
        "Examen General de Orina",
        "Urocultivo",
        "Toxoplasma IgG",
        "HIV",
        "TGP"
      ]
    },
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
    },
    {
      nombre: "UROANÁLISIS",
      estudios : [
        "Examen General de Orina", 
        "Prueba de Embarazo en Orina", 
        "Microalbuminuria",
        "Proteina en Orina 24 horas",
        "Depuración de creatinina 24 horas"
      ]
    }

  ];

  estudiosSeleccionados = [];

  constructor() { }

  ngOnInit(): void {
  }

}

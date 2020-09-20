import { Component, OnInit} from '@angular/core';

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
      id: 1,
      nombre: "QUÍMICA CLÍNICA",
      todos: false,
      examenes : [
        {nombre: "Gluscosa", seleccionado: false},
        {nombre: "Glucosa 2H Post-Pandrial", seleccionado: false},
        {nombre: "Glucosa Tolerancia horas", seleccionado: false},
        {nombre: "Test de O'Sullivan", seleccionado: false},
        {nombre: "Hemoglobina Glicosilada A1C", seleccionado: false},
        {nombre: "Colesterol", seleccionado: false},
        {nombre: "Triglicéridos", seleccionado: false},
        {nombre: "Ácido Úrico", seleccionado: false},
        {nombre: "Creatinina", seleccionado: false},
        {nombre: "Nitrogeno Ureico", seleccionado: false},
        {nombre: "Colesterol HDL", seleccionado: false},
        {nombre: "Colesterol LDL", seleccionado: false},
        {nombre: "Proteinas Totales relación A/G", seleccionado: false},
        {nombre: "Albumina", seleccionado: false},
        {nombre: "TGO", seleccionado: false},
        {nombre: "TGP", seleccionado: false},
        {nombre: "Bilirrubinas", seleccionado: false},
        {nombre: "Globulina", seleccionado: false},
        {nombre: "Lipasa", seleccionado: false},
        {nombre: "(CPK) Creatin Fosfoquinasa", seleccionado: false},
        {nombre: "(CPK). MB Creatin Fosfoquinasa", seleccionado: false},
        {nombre: "LDH (Deshidrogenasa Láctica)", seleccionado: false},
        {nombre: "Hierro Serico", seleccionado: false},
        {nombre: "Hierro Capacidad de Fijación", seleccionado: false},
        {nombre: "Transferrina", seleccionado: false},
        {nombre: "Ferritina", seleccionado: false}
      ]
    },
    {
      id: 2,
      nombre: "PERFIL RUTINARIO",
      todos: false,
      examenes : [
        {nombre: "Glucosa",  seleccionado: false}, 
        {nombre: "Colesterol",  seleccionado: false},
        {nombre: "Triglicéridos",  seleccionado: false},
        {nombre:  "Ácido Úrico",  seleccionado: false},
        {nombre:  "Creatinina",  seleccionado: false},
        {nombre:  "Ex. General de Orina", seleccionado: false},
        {nombre:  "Ex. General de Heses", seleccionado: false}
      ]
    },
    {
      id: 3,
      nombre: "PERFIL RUTINARIO N° 2",
      todos: false,
      examenes : [
        {nombre:  "Hemograma", seleccionado: false},
        {nombre:  "Glucosa", seleccionado: false},
        {nombre:  "Colesterol", seleccionado: false},
        {nombre:  "Triglicéridos", seleccionado: false},
        {nombre:  "Ácido Úrico", seleccionado: false},
        {nombre:  "Creatinina", seleccionado: false},
        {nombre:  "Nitrogeno Ureico", seleccionado: false},
        {nombre:  "TGO", seleccionado: false},
        {nombre:  "TGP", seleccionado: false},
        {nombre:  "Ex. General de Orina", seleccionado: false},
        {nombre:  "Ex. General de Heses", seleccionado: false}
      ]
    },
    {
      id: 4,
      nombre: "PERFIL PRENATAL",
      todos: false,
      examenes: [
        {nombre: "Hemograma", seleccionado: false},
        {nombre: "Glucosa", seleccionado: false}, 
        {nombre: "Tipeo Sanguineo", seleccionado: false}, 
        {nombre: "VDHL", seleccionado: false}, 
        {nombre: "Examen General de Orina", seleccionado: false}, 
        {nombre: "Urocultivo", seleccionado: false},
        {nombre: "Toxoplasma IgG", seleccionado: false},
        {nombre: "HIV", seleccionado: false},
        {nombre: "TGP", seleccionado: false}
      ]
    },
    {
      id: 5,
      nombre: "HEMATOLOGÍA",
      todos: false,
      examenes : [
        {nombre: "Hemograma", seleccionado: false},
        {nombre: "Ht - Hb", seleccionado: false}, 
        {nombre: "Leucograma", seleccionado: false},  
        {nombre: "Plaquetas", seleccionado: false}, 
        {nombre: "Hemograma - Plaquetas", seleccionado: false},
        {nombre: "Eritrosedimentación", seleccionado: false},
        {nombre: "Frotis de sangre periférica", seleccionado: false},
        {nombre: "Reticulositos", seleccionado: false},
        {nombre: "Células Falsiformes", seleccionado: false},
        {nombre: "Células LE", seleccionado: false},
        {nombre: "Concentrado de Strout (T. Cruzi)", seleccionado: false}
      ]
    },
    {
      id: 6,
      nombre: "ELECTROLITOS",
      todos: false,
      examenes : [
        {nombre: "Sodio", seleccionado: false},
        {nombre: "Sodio", seleccionado: false},
        {nombre: "Potasio", seleccionado: false}, 
        {nombre: "Cloro", seleccionado: false},
        {nombre: "Calcio", seleccionado: false},
        {nombre: "Fósforo", seleccionado: false},
        {nombre: "Magnesio", seleccionado: false}
      ]
    },
    {
      id: 7,
      nombre: "BACTEREOLOGÍA",
      todos: false,
      examenes : [
        {nombre: "Urocultivo", seleccionado: false},
        {nombre: "Coprocultivo", seleccionado: false}, 
        {nombre: "Cultivo de Secreciones:", seleccionado: false}, 
        {nombre: "Hemocultivo", seleccionado: false}, 
        {nombre: "Cultivo Faringeo", seleccionado: false}, 
        {nombre: "Cultivo Nasal", seleccionado: false}, 
        {nombre: "Cultivo de Oído: Izq.", seleccionado: false},
        {nombre: "Cultivo de Oído: Der.", seleccionado: false},
        {nombre: "KDH", seleccionado: false},
        {nombre: "Cultivo de BAAR", seleccionado: false},
        {nombre: "Directo de Secreción", seleccionado: false},
        {nombre: "Coloración de Gram", seleccionado: false}
      ]
    },
    {
      id: 8,
      nombre: "ENDOCRINOLOGÍA",
      todos: false,
      examenes : [
        {nombre: "T3 Total", seleccionado: false},
        {nombre: "T4 Total", seleccionado: false}, 
        {nombre: "TSH", seleccionado: false}, 
        {nombre: "T3 Libre", seleccionado: false},
        {nombre: "T4 Libre", seleccionado: false},
        {nombre: "TSH Ultrasensible (3ra. Gen)", seleccionado: false},
        {nombre: "Insulina", seleccionado: false},
        {nombre: "Insulina Post Pandrial", seleccionado: false},
        {nombre: "Testosterona", seleccionado: false},
        {nombre: "Prolactina", seleccionado: false},
        {nombre: "FSH", seleccionado: false},
        {nombre: "LH", seleccionado: false},
        {nombre: "Gonad Coriónica hcg - cuartil", seleccionado: false},
        {nombre: "Hormona paratorides", seleccionado: false},
        {nombre: "Hormona del Crecimiento", seleccionado: false},
        {nombre: "Cortisol_am_pm", seleccionado: false},
        {nombre: "Progesterona", seleccionado: false}
      ]
    },
    {
      id: 9,
      nombre: "UROANÁLISIS",
      todos: false,
      examenes : [
        {nombre: "Examen General de Orina", seleccionado: false},
        {nombre: "Prueba de Embarazo en Orina", seleccionado: false},
        {nombre: "Microalbuminuria", seleccionado: false}, 
        {nombre: "Proteina en Orina 24 horas", seleccionado: false}, 
        {nombre: "Depuración de creatinina 24 horas", seleccionado: false}
      ]
    }

  ];

  estudiosSeleccionados = [];


  constructor() {
   
  }

  ngOnInit() {
    
  }


  OnSubmit(){
     console.log(this.estudiosSeleccionados); 
  }

  //Para manejar cuando seleccionan todos los examenes de un estudio
  todos(event, idEstudio){
    
    if(event.target.checked){ //Si se chequeo todo de un estudio especifico
        this.estudiosClinicos.map(x => {
            if(x.id === idEstudio){ //en el estudio especifico

              x.todos = true; //cambia a true el estado del checkbox en el modelo
              x.examenes.map( y => {
                  y.seleccionado = true;//se recorren y se ponen a true todos los examenes
              });

              let encontrado = false;

              if(this.estudiosSeleccionados.length != 0){

                for (let index = 0; index < this.estudiosSeleccionados.length; index++) {
                  if(this.estudiosSeleccionados[index].id === x.id){
                    this.estudiosSeleccionados[index] = x;
                    encontrado = true;
                  }
                  
                }//Fin del for
              }

              if(!encontrado){
                this.estudiosSeleccionados.push(x);
              }
              
            }//fin del if
        });
    }else{
      this.estudiosClinicos.map( x => {
        if(x.id === idEstudio){//en el estudio especifico
          x.todos = false; //el checkbox se pone a falso
          x.examenes.map( y => {
              y.seleccionado = false;//y tambien todos los examenes
          });

          if(this.estudiosSeleccionados.length != 0){

            //Se borra del vector de seleccion
            for (let index = 0; index < this.estudiosSeleccionados.length; index++) {
              if(this.estudiosSeleccionados[index].id === x.id){
                this.estudiosSeleccionados.splice(index, 1);
              }
              
            }//Fin del for
          }
          
        }//Fin del if
      });
    }//Fin del else
  }

  
  //Para manejar cuando son examenes especificos de diferentes estudios
  examenSingular(event, idEstudio, i){
      
      if(event.target.checked){
          let preparedArray = [];
          let encontrado = false;
          this.estudiosClinicos.map( a => {
            
              if(a.id === idEstudio){
                a.todos = false;
                a.examenes[i].seleccionado = true;
                preparedArray = a.examenes.filter(b => b.seleccionado === true);
                
                for (let j = 0; j < this.estudiosSeleccionados.length; j++) {
                  if(this.estudiosSeleccionados[j].id === a.id){
                    this.estudiosSeleccionados[j].examenes = preparedArray;
                    encontrado = true;
                  } 
                }

               if(!encontrado){
                  let estudio = {
                    id: a.id,
                    nombre: a.nombre,
                    todos: a.todos,
                    examenes: preparedArray
                  };
                  this.estudiosSeleccionados.push(estudio);
               }
               
              }//fin del primer if

          });//fin del primer map

      }else{
        //DATO: Aqui ya no usé map porque estaba probando arreglar un error y asi lo deje con for
        let array = this.estudiosClinicos;//Para usarlo mejor
        for (let a = 0; a < array.length; a++) {
            let preparedArray = [];
            let encontrado = false;
            if(array[a].id === idEstudio){
                array[a].todos = false;
                array[a].examenes[i].seleccionado = false;

                for (let b = 0 ; b< array[a].examenes.length; b++) {
                   if(array[a].examenes[b].seleccionado == true){
                      preparedArray.push(array[a].examenes[b]);
                   }
                  
                }
                
                let hayExamenes = false;
                let indice = 1000;//un valor cualquiera por defecto
                let examenesOK = array[a].examenes;//Para arreglar desmadre de la referencia despues del for
                if(this.estudiosSeleccionados.length != 0){

                  for (let j = 0; j < this.estudiosSeleccionados.length; j++) {
                    if(this.estudiosSeleccionados[j].id === array[a].id){
                      encontrado = true;
                      if(preparedArray.length != 0){
                        this.estudiosSeleccionados[j].examenes = preparedArray;
                        hayExamenes = true;
                      }else{
                        hayExamenes = false;
                        indice = j;
                      }
                      
                    }//Si se encuentra en los seleccionados
                  }//Fin del for
                  array[a].examenes = examenesOK;//Arreglando el bug raro de referencia de memoria (CINTA ADHESIVA)
                 
                }//Fin si hay seleccionados

                if(!hayExamenes && indice != 1000){//Si NO! hay examenes y el indice no ha cambiado su valor por defecto
                  this.estudiosSeleccionados.splice(indice,1); //Elimina el estudio seleccionado
                }
                if(!encontrado){
                  let estudio = {
                    id: array[a].id,
                    nombre: array[a].nombre,
                    todos: array[a].todos,
                    examenes: preparedArray
                  };
                  this.estudiosSeleccionados.push(estudio);
                }

            }
        }//Fin del for
        

      }//Fin del else
  }

  //Para actualizar la pagina de la paginación
  pageChanged(event){
    this.p = event;
  }




}

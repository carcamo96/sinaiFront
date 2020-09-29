import { Receta } from './receta';
import { EstudiosSeleccionados } from './estudiosSeleccionado';
export class Consulta{
    constructor(
        public pacienteId: string,
        public motivo?: string,
        public tiemSintoma?: string,
        public fechaConsul?: Date,
        public historia?: string,
        public antePatol?: string,
        public alergias?: string,
        public signosVitales?: any,
        public diagnostico:any = {},
        public receta: Receta = new Receta(),
        public estudios: EstudiosSeleccionados = new EstudiosSeleccionados()
    ){}
 
    public setReceta(recetaMedica : Receta) {
        this.receta = recetaMedica;
    }
    public setEstudios(estudios : EstudiosSeleccionados){
        this.estudios = estudios;
    }
    
}

/*Coloco todos los atributos como opcionales para manejarlos por convencion en el componente padre
de la consulta */
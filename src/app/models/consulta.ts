import { Receta } from './receta';

export class Consulta{
    constructor(
        public pacienteId: string,
        public motivo?: string,
        public tiemSintoma?: string,
        public fechaConsul?: Date,
        public edadAlaFecha?: string,
        public historia?: string,
        public antePatol?: string,
        public signosVitales?: any,
        public alergias?: string,
        public examenFisico?: string,
        public citoglogia: any = {},
        public diagnostico:any = {},
        public receta: Receta = new Receta()
    ){}
 
    public setReceta(recetaMedica : Receta) {
        this.receta = recetaMedica;
    }
    
}

/*Coloco todos los atributos como opcionales para manejarlos por convencion en el componente padre
de la consulta */
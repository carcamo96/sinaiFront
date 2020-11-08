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
        public temperatura?: string,
        public frecuenciaCardiaca?: string,
        public frecuenciaRespiratoria?: string,
        public peso?: string,
        public talla?: string,
        public indiceMC?: string,
        public presionSistolica?: string,
        public presionDiastolica?: string,
        public presionArterial?: string,
        public perimetroCefalico?: string,
        public circunferenciaAbdominal?: string,
        public alergias?: string,
        public examenFisico?: string,
        public fechaCitoglogia?: string,
        public observacionCitologia?: string,
        public diagnostico:any = {},
        public receta: Receta = new Receta()
    ){}
 
    public setReceta(recetaMedica : Receta) {
        this.receta = recetaMedica;
    }
    
}

/*Coloco todos los atributos como opcionales para manejarlos por convencion en el componente padre
de la consulta */
export class Consulta{
    constructor(
        public _id: string,
        public motivo: string,
        public tiemSintoma: string,
        public fechaConsul: string,
        public fechaModificacion: string,
        public historia: string,
        public antePatol: string,
        public alergias: string,
        public peso: string,
        public talla: string,
        public temperatura: string,
        public presionArt: string,
        public freCardia: string,
        public indiceMC: string
    ){}
}
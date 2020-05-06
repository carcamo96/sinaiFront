export class Consulta{
    constructor(
        public paciente: string,
        public motivo: string,
        public tiemSintoma: string,
        public fechaConsul: string,
        public historia: string,
        public antePatol: string,
        public alergias: string,
        public peso: string,
        public talla: string,
        public temperatura: string,
        public presionArt: string,
        public freCardia: string,
        public indiceMC: string,
        public fechaCre: string,
        public diagnostico:string
    ){}
}
export class Paciente{

    constructor(

        public nombre: string,
        public apellidos: string,
        public fechaNac: Date,
        public gen: string,
        public telefono: string,
        public encargado: string,
        public parentesco: string,
        public faContacto: string,
        public telFaContacto: string,
        public direccion: string,
        public otrosDatos: string

    ){}
    
}
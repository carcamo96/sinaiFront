export class Usuario{

    constructor(
        public usuario: string,
        public pass: string,
        public rol: string,
        public fechaRegistro: Date,
        public estado: string
    ){}
}
export class Usuario{
public _id?;
    constructor(
        _id: string,
        public usuario: string,
        public pass: string,
        public rol: string,
        public fechaRegistro: Date
    ){}
}
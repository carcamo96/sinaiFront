export class RecetaItem{
    constructor(
        public medicamento: string,
        public presentacion: string,
        public concentracion: string,
        public cantidad: number,
        public frecuencia: string,
        public duracion: string,
        public medidaDosis: string
    ){}
}
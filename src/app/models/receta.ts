import { RecetaItem } from './recetaItem';
export class Receta{

    constructor(
        public recetaItems: RecetaItem[] = [],
        public detallesMedicos: string = ""
    ){}


}
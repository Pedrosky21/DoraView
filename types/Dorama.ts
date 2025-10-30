import Genero from "./Genero";
import Tag from "./Tag";

interface Dorama {
    id: number,
    titulo: string,
    sinopsis: string,
    review: string,
    imagen_url: string,
    calificacion: number,
    generos?: Genero[],
    tags?: Tag[]
}

export default Dorama;

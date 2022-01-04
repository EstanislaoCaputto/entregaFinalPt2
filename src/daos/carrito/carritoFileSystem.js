import FileContainer from "../../contenedores/FileContainer.js";

export default class carritoFileSystem extends FileContainer{
    constructor(){
        super('carrito.txt');
    }
}
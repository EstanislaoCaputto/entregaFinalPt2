import FileContainer from "../../contenedores/FileContainer.js";

export default class ProdFileSystem extends FileContainer{
    constructor(){
        super('productos.txt');
    }
}
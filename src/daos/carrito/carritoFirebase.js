import FBcontainer from "../../contenedores/FBcontainer.js";

export default class CarritoFirebase extends FBcontainer{
    constructor(){
        super()
        this.producRef = this.db.collection('carrito')
    }
}
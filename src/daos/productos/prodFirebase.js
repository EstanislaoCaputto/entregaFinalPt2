import FBcontainer from "../../contenedores/FBcontainer.js";

export default class ProdFirebase extends FBcontainer {
    constructor() {
        super()
        this.productRef = this.db.collection('productos')
    }
    
}
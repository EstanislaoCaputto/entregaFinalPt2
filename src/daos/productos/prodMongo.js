import MongoContainer from "../../contenedores/mongoContainer.js";

export default class ProductMongo extends MongoContainer{
    constructor(){
        super('productos',
        {
            titulo:{type:String, required:true},
            marca:{type:String, required:true, default:'Sin Marca'},
            tipo:{type:String, required:true},
            imagen:{type:String, required:true},
            descripcion:{type:String, default:'Sin descripcion'},
            precio:{type:Number, required:true}
        },{timestamps:true}
        )
    }
}
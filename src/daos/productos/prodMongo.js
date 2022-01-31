import MongoContainer from "../../contenedores/mongoContainer.js";

export default class ProductMongo extends MongoContainer{
    constructor(){
        super('productos',
        {
            name:{type:String, required:true},
            marca:{type:String, required:true, default:'Sin Marca'},
            categories:{type:Array, required:true},
            images:{type:Array, required:true},
            description:{type:String, default:'Sin descripcion'},
            prices:{type:Array, required:true}
        },{timestamps:true}
        )
    }
}
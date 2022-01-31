import MongoContainer from "../../contenedores/mongoContainer.js";

export default class User extends MongoContainer{
    constructor(){
        super('users',
        {
            nombre:{type:String, required:true},
            apellido:{type:String, required:true},
            contraseña:{type:String, required:true},
            mail:{type:String,required:true},
            username:{type:String,required:true}
        },{timestamps:true}
        )
    }
}
import Schema from "mongoose";
import MongoContainer from "../../contenedores/mongoContainer.js";

export default class Mensaje extends MongoContainer{
    constructor(){
        super(
            'mensajes',
            {
                usuario:[{
                    type:Schema.Types.ObjectId,
                    ref:'users'
                }],
                mensaje:String
            },{timestamps:true}
        )
    }
}
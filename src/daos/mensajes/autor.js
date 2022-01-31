import  mongoose  from "mongoose";
const { Schema, model } = mongoose

export const AutorSchema = new Schema({
    id: {type:String, required:true},
    nombre: {type:String, required:true},
    apellido: {type:String, required:true},
    edad: {type:Number},
    alias: {type:String},
    avatar: {type:String}
}, {timestamps:true})

export const AutorModel = model('Autor', AutorSchema)
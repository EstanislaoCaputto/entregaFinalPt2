import mongoose  from "mongoose";
import config from "../config.js";

mongoose.connect(config.mongo.baseUrl, {useNewUrlParser:true,useUnifiedTopology:true})

export default class MongoContainer{
    constructor(collection, schema, timestamps){
        this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps))
    }
    getAll = async() =>{
        try {
            
            let documents = await this.collection.find()
            return{status:'Exito', payload:documents}
        } catch (error) {
            return{status:'Error', error:error}
        }
    }
    save = async(objeto) =>{
        try {
            await this.collection.create(objeto)
            return{status:'Exito', message:'Guardado'}
        } catch (error) {
            return{status:'Error', error:error}
        }
    }
    buscarPorId = async(id) =>{
        try {
            let buscado = await this.collection.find({"_id":id})
            return {status:'Exito', payload:buscado}
        } catch (error) {
            return{status:'Error', error:error}
        }
    }
    editarPorId = async(id, producto) =>{
        try {
            let editar = await this.collection.updateOne({'_id':id},{$set:producto})
            return{status:'Exito', message:'Editado con exito', payload:editar}
        } catch (error) {
            return{status:'Error', error:error}
        }
    }
    eliminar = async() =>{
        try {
            await this.collection.deleteMany()
            return{status:'Exito', message:'Todo eliminado :´)'}
        } catch (error) {
            return{status:'Error', error:error}
        }
    }
    eliminarPorId = async(id) =>{
        try {
            await this.collection.deleteOne({'_id':id})
            return{status:'Exito', message:`el objeto con el id: ${id}, fue eliminado`}
        } catch (error) {
            return{status:'Error', error:error}
        }
    }
}
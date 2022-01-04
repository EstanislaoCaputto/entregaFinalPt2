import { admin } from "firebase-admin";
import cuentaServicio from '../daos/proyectoprueba-5af0a-firebase-adminsdk-kbfob-d173ef722c.js'

admin.initializeApp({
    credential: admin.credential.cert(cuentaServicio),
    databaseURL: 'http://proyectoprueba-5af0a.firebaseio.com'
})


export default class FBcontainer{
    constructor(){
        this.db = admin.firestore()
    }
    getAll = async() =>{
        try {
            let document = await this.productRef.get()
            let productos = document.docs.map(p=> {
                let producto = p.data()
                return producto
            })
            return{status:'Exito', payload:productos}
        } catch (error) {
            return{status:'Error', message:`No se pudo obtener productos ${error}`}
        }
    }
    buscarPorId = async(id) =>{
        try {
            let document = await this.productRef.doc(id).get()
            let producto = document.data()
            return{status:'Exito', payload:producto}
        } catch (error) {
            return{status:'Error', message:`No se pudo obtener el producto ${error}`}
        }
    }
    save = async(producto) =>{
        try {
            let prodParaGuardar = await this.productRef.add(producto)
            return{status:'Exito', menssage:'Producto guardado con éxito'}
        } catch (error) {
            return{status:'Error', message:`No se pudo cargar el producto ${error}`}
        }
    }
    editarPorId = async(id, producto) =>{
        try {
            let document = await this.productRef.doc(id)
            await document.update(producto)
            return{status:'Exito', message:'Producto editado con exito'}
        } catch (error) {
            return{status:'Error', message:`No se encontro el producto con ese ID ${error}`}
        }
    }
    eliminarPorId = async(id) =>{
        try {
            let document = await this.productRef.doc(id)
            await document.delete()
            return{status:'Exito', message:'Producto eliminado'}
        } catch (error) {
            return{status:'Error', message:`No se pudo eliminar el producto ${error}`}
        }
    }
}
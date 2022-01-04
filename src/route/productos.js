import express from "express";
import upload from "../services/uploader.js";
import { productos } from "../daos/Gestionador.js";
// import ProductosDB from "../services/Productos.js";


const routerProducto = express.Router();
// const prodService = new ProductosDB();

//GET
routerProducto.get('/',(req,res)=>{
    productos.getAll().then(resultado=>{
        res.send(resultado)
    })
})
routerProducto.get('/:pid',(req,res)=>{
    let id = req.params.pid;
    productos.buscarPorId(id).then(resultado=>{
        res.send(resultado)
    })
})

//POST
routerProducto.post('/', (req, res) => {

    let producto = req.body;
    productos.save(producto).then(result => {
        res.send(result)
    })

})
//PUT
routerProducto.put('/:id', upload.single('image'), (req, res) => { //recibo es producto editado y con el id borro el prod viejo

    let id = req.params.id
    let producto = req.body
    try {
        productos.editarPorId(id, producto).then(result=>{

            res.send(result)
        })
    } catch {
        return ({ status: 'Error', message: 'Error al editar el producto compruebe el ID' })
    }
})

//DELETE
routerProducto.delete('/:id',(req,res)=>{
    let id = req.params.id
    try {
        productos.eliminarPorId(id).then(resultado=>{
            res.send(resultado)
        })
    } catch (error) {
        return{status:'Error', message:'No se pudo borrar el producto'}
    }
})

export default routerProducto;
import express from "express";
import { carrito } from "../daos/Gestionador.js";
// import Carro from "../services/Carrito.js";

// const carritoService = new Carro();
const routerCarrito = express.Router();

//GET
routerCarrito.get('/',(req,res)=>{
    carrito.getAll().then(result=>{
        res.send(result)
    })
    
})
routerCarrito.get('/id', (req,res)=>{
    let id = req.params.id
    carrito.buscarPorId(id).then(result=>{
        res.send(result)
    })
})

//POST
routerCarrito.post('/',(req,res)=>{
    let pedido = req.body

    carrito.save(pedido).then(resul => {
        res.send(resul)
    })
})


//DELETE
routerCarrito.delete('/:id',(req,res)=>{
    let id = req.params.id;
    carrito.eliminarPorId(id).then(result=>{
        res.send(result)
    })
    
})





export default routerCarrito
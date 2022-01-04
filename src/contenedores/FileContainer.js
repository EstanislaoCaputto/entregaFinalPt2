import fs from 'fs';
import config from '../config.js';

export default class FileContainer{
    constructor(file_endpoint){
        this.url = `${config.fileSystem.baseUrl}${file_endpoint}`
    }

    getAll = async() =>{
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            return{status:'Exito', objeto: JSON.parse(data)}
        } catch (error) {
            return {status:'Error', error:`No se pudo obtener los datos, ${error}`}
        }
    }
    buscarPorId = async (id) =>{
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let datoParse = JSON.parse(data);
            let buscado = datoParse.find(d=> d.id===id)
            if(buscado){
                return {status:'Exito', payload: buscado}
            }else{
                return{status:'Error', message:`El producto con el id: ${id} de momento no ta :S`}
            }
        } catch (error) {
            return {status:'Error', error:`No se pudo obtener el dato, ${error}`}
        }
    }
    save = async(objeto) =>{
        try{
            let misDatos = await fs.promises.readFile(this.url,'utf-8');
            let productoParseado = JSON.parse(misDatos);
            let id = productoParseado.length + 1
            objeto.id = id;
            let timestamp = Date.now();
            let time = new Date(timestamp)
            objeto.timestamp = time.toTimeString().split(" ")[0]
            productoParseado.push(objeto);
            await fs.promises.writeFile(this.url,JSON.stringify(productoParseado,null,2));
            console.log(`${objeto.titulo} guardado con exito con el id: ${objeto.id}`);
            return{status:"Exito", message:"Producto guardado!"};
            
        }catch{
            let id = 1
            let timestamp = Date.now();
            let time = new Date(timestamp)
            objeto.timestamp = time.toTimeString().split(" ")[0]
            objeto.id = id
            try {
                await fs.promises.writeFile(this.url, JSON.stringify([objeto],null,2));
                return{status:"Exito!", message:"Producto agregado!"};
                
            }catch (error) {
                return{status:'Error', message:"Error al guardar el archivo", error:error}
            };
        };
    };
    editarPorId = async(id, producto) =>{
        try {
            let misDatos = await fs.promises.readFile(this.url, 'utf-8');
            let productos = JSON.parse(misDatos);
            let prod = productos.map(impresora=>{
                if(impresora.id===id){
                    impresora = Object.assign({...impresora, ...producto})
                    return impresora
                }else{
                    return impresora
                }
            })
            
            try {
                await fs.promises.writeFile(this.url, JSON.stringify(prod, null, 2))
            } catch{
                
                return {status:'Error', message:'No se pudo editar el producto con el ID indicado'}
            }
        } catch (error) {
            return{status:'Error', error:error}
        }
    }
    buscarPorId = async(id) =>{
        try {
            let misDatos = await fs.promises.readFile(this.url, 'utf-8');
            let productos = JSON.parse(misDatos);
            let elProducto = productos.find(p=>p.id===id);
            if(elProducto){
                return{status:'Exito!', objeto:elProducto}
            }else{
                return{status:'Error', message:`El producto con el id: ${id} de momento no ta :S`}
            };
        } catch{
            return{status:'Error', message:`Error al buscar el producto`}
        }
    }
    eliminarPorId = async(id) =>{
        let misDatos = await fs.promises.readFile(this.url, 'utf-8');
        let productos = JSON.parse(misDatos);
        let prodBorrado = productos.filter(p=>p.id!==id)
        try {
            await fs.promises.writeFile(this.url, JSON.stringify(prodBorrado, null, 2))
            console.log(`Eliminaste el producto con el ID: ${id}`);
            return{status:'Exito!', message:'Objeto eliminado con éxito!'}
        } catch{
            return{status:'Error', message:'Problema para eliminar el archivo'}
        }
    }
    eliminar = async() =>{
        await fs.promises.unlink(this.url, function(err){
            if (err) return{status:'Error', message:`Error al borrar: ${err}`}
            return{status:'Exito!', message:'Productos eliminados con éxito'}
        })
    }
}
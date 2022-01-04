import express from "express";
import __dirname from "./utils.js";
import routerCarrito from "./route/carrito.js";
import routerProducto from "./route/productos.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Server listen at port ${PORT}`));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(404).send({error: -2, descripcion:`la ruta ${req.originalUrl} y el metodo: ${req.method}, no estan autorizados`})
    next()
})
app.use((req, res, next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0], req.method, req.originalUrl);
    next();
})
app.use('/api/productos', routerProducto);
app.use('/api/carrito', routerCarrito);
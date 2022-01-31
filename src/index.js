import express from "express";
import __dirname from "./utils.js";
import routerCarrito from "./route/carrito.js";
import routerProducto from "./route/productos.js";
import session from "express-session";
import { productos } from "./daos/Gestionador.js";
import { mensaje } from './daos/Gestionador.js'
import MongoStore from 'connect-mongo'
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`Server listen at port ${PORT}`));
const baseSession = (session({
    store:MongoStore.create({mongoUrl:'mongodb+srv://Tano:HolaTano@cluster0.sgvya.mongodb.net/sessions?retryWrites=true&w=majority'}),
    resave:false,
    saveUninitialized:false,
    secret:'claveTano'
}))
const io = new Server(server)


app.set('views', __dirname+'/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(baseSession)
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

app.get('/', (req,res)=>{

    productos.getAll().then(impresoras=>{
        // console.log(impresoras.payload);
        let objRenderizado = {
            objetos:impresoras.payload
        }
        res.render('productos', objRenderizado)
    })
})

io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    let mensjEmit = await mensaje.getAll().then(resul=>{
        return resul
    })
    socket.emit('mensajeLog', mensjEmit.message);

    socket.on('mensj', async dato=>{
        io.emit('mensajeLog', mensjEmit.message);
        await mensaje.save(dato).then(resultado=>{
            console.log(resultado);
        })
    })
    

})
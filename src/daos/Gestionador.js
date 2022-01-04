let productos;
let carrito;
let persistencia = 'fileSystem';

switch(persistencia){
    case 'fileSystem':
        const {default:ProdFileSystem} = await import('./productos/prodFileSystem.js')
        const {default:carritoFileSystem} = await import('./carrito/carritoFileSystem.js')

        productos = new ProdFileSystem();
        carrito = new carritoFileSystem();
        break;

    case 'mongo':
        const {default:prodMongo} = await import ('./productos/prodMongo.js')
        const {default:carritoMongo} = await import ('./carrito/carritoMongo.js')

        productos = new prodMongo()
        carrito = new carritoMongo()
        break;

    case 'firebase':
        

        break;
    default:

}

// import admin from 'firebase-admin';
// import cuentaServicion from './proyectoprueba-5af0a-firebase-adminsdk-kbfob-d173ef722c.js'
// admin.initializeApp({
//     credential: admin.credential.cert(cuentaServicion),
//     databaseURL:'http://proyectoprueba-5af0a.firebaseio.com'
// })

export {productos, carrito}
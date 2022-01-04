import Schema from 'mongoose'
import MongoContainer from '../../contenedores/mongoContainer.js'

export default class CarritoMongo extends MongoContainer{
    constructor(){
        super(
            'carrito',
            {
                productos:[{
                    type:Schema.Types.ObjectId,
                    ref: 'productos',
                }],
                default:[]
            },{timestamps:true}
        )
    }
}
//configuracion de mongoDB para la conexion local (pc)
import { connect } from "mongoose";

async function main() {
    await connect(process.env.MONGO_URI)
}
main()
.then(() => console.log("MongoDB se conecto a la red local")) //indica el estado una vez iniciado el mongoD
.catch(err => console.log(`conexion fallida con la base de datos: ${err.message}`))  //indica conexion fallida de mongo con el servidor local (dolor de cabeza :P)
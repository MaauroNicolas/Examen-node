"use strict" //se utiliza el modo estricto de java 
import './config/mongoDB.js'
import express from 'express'; 
import { router as moviesRouter } from './routers/movies.js';
import { router as authRouter } from './routers/auth.js'
import rateLimitConfig from './config/rateLimitConfig.js';
import helmet from 'helmet'; //desabilita la cabecera power id
import {router as healthRouter } from './routers/health.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())
// se importa rate limit en el index para que se desactive cuando estamos en desarrollo
if (process.env.NODE_ENV === 'production'){
    app.use(rateLimitConfig)
    app.use(helmet())
   }

app.disable ('x-powered-by');


app.use("/api/v1/movies", moviesRouter) //link raiz
app.use("/api/v1/auth", authRouter) //controlador de login y register
app.use('/health', healthRouter)  //indica si nuestro servidor esta en optimas condiciones
 



app.listen(PORT, (err) => {
    err ? console.log(`El servidor esta corriendo: ${err}`)
    :
    console.log(`Server up: http://localhost:3000`)
})
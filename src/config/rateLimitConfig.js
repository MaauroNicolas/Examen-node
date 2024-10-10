//ratelimit limita la cantidad de paquetedes entre el cliente y servidor
import rateLimit from "express-rate-limit"
const rateLimitConfig = rateLimit ({
    
    windows: 500*60* 7, //limite por ventana por tiempo
      
    max: 500, //maximo peticiones
    message: "Demasiadas peticiones desde esta ip, intentalo nuevamente mas tarde"})

    export default rateLimitConfig
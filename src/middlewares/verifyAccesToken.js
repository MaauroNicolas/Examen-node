//Token de seguridad (permiso para agregar, eliminar y modificar)
import jwt from "jsonwebtoken"
export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization
if (authHeader){
    const token = authHeader.split(" ").pop()
  
    jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=> {
        if (err) return res.status(401).json({success : false, message:"Invalido o expiro el token"})
            req.decoded = decoded

        next()
    })

    } else {
        res.status(401).json({sucess : false, message:"No se proporcionó token de acceso"})
    }
     
    

}
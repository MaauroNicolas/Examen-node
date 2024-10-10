import User from "../models/mongoDB/User.js";
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken'
const saltRounds = 10
//controlador de login y register

//LOGIN
export const authController = {
    async login(req, res) {
        const response = await User.find().where({ email: req.body.email })
        if (!response.length){
            res.status(401).json({ success: false, message: "Email o contraseña invalida" })}
        
        const isSamePassword = await compare(req.body.password, response[0].password)
        if (!isSamePassword){
            res.status(401).json({ success: false, message: "Contraseña invalida" })}
        const userForToken = {
            userName: response[0].fullName,
            userEmail: response[0].email,
            sub: response[0].id
        }
        const accessToken = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.status(200).json({ sucess: true, message:"Usuario autenticado", data: accessToken })
        
    },

    //REGISTER
    async registerUser(req, res) {
        try{
        const {fullName, email} = req.body
        const password = await hash(req.body.password, saltRounds)
        const newUser = new User({ fullName, email, password })  
        const response = await newUser.save()

        
        res.status(200).json({ success:true, message: "Nuevo usuario registrado", data: response })

        }catch(err){
            res.status(500).json({ success: false, message: `Error interno del servidor ${err}` })
        }

    }
}
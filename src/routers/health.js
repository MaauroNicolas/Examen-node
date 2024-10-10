//Indica el estado del servidor 
import {Router} from "express";
import mongoose from "mongoose";

export const router = Router ()
router.get ('/', (req, res)=>{
    try {

        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
        if (dbStatus !== 'connected'){
            return res.status(500).json ({
                 status:'error',
                 message: 'El servicio esta saludable',
                'dtabase status' : dbStatus
            })
        }
        res.status(200).json({
        status:'ok',
        message: 'El servicio esta saludable'
    })
    

} catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'El servicio no esta saludable',
            error: error.message
            
        })
    }
})

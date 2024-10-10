//rutas del servidor
import { Router } from "express";
import { movieController } from "../controllers/movies.js";
import { verifyAccessToken } from "../middlewares/verifyAccesToken.js";
export const router = Router();

router.get("/", movieController.getAll) 
router.get("/s", movieController.getByTitle) 
router.get("/:id", (req, res) => { }) 
router.post("/", verifyAccessToken, movieController.createOne) 
router.patch("/:id", verifyAccessToken, movieController.updateOne) 
router.delete("/:id", verifyAccessToken, movieController.deleteOne) 

//Se agrega la verificacion de token entre la ruta de acceso y el controlador
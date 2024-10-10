import { json } from "express"
import Movie from "../models/mongoDB/Movie.js"

export const movieController = {
    async getAll(req, res){
        try{ 
            const movies = await Movie.find()
            movies.length ?
            res.status(200).json({ success: true, message: "Coleccion de peliculas", data: movies }) //cantidad de peliculas en la base de datos
            :
            res.status(404).json({ success: false, message: "La base de datos esta vacia" }) //Se refresca la base de datos y no hay datos 
        } catch (error){
            res.status(500).json({ sucess: false, message: "Error interno del servidor"})
        }
    },
        //crear
        async createOne(req, res) {            
            const { title, year, director, duration, poster, genre, rate } = req.body //esquema de  /mongoDB/Movies.js para crear peliculas
            try{ 
                const newMovie = new Movie({
                    title, year, director, duration, poster, genre, rate
                })
                const savedMovie = await newMovie.save()
                res.status(200).json({ success: true, message: "Nueva pelicula creada", data: savedMovie })
            } catch (error){
                res.status(500).json({ sucess: false, message: "Error interno del servidor"})
            }
        },
        //actualizar
        async updateOne(req, res){
            try{
                const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true})
                if(!updatedMovie){
                    res.status(404).json({ sucess: false, message: "Eliminacion fallida" })
                }
                res.status(200).json({ sucess: true, message: "pelicula agregada", data: updatedMovie})                
            } catch (err){
                res.status(500).json( {sucess: false, message: "Error interno del servidor"} )
            }
        },
        //eliminacion por id
        async deleteOne(req, res){
            try {
                const movie = await Movie.findByIdAndDelete(req.params.id)
                if (!movie){
                    return res.status(404).json({ sucess: false, message: "Eliminacion fallida, Pelicula no encontrada."})
                }
                res.send(204)
            } catch (error) {
                res.status(500).json({ sucess: false, message: `Error interno del servidor --> ${error}`})
            }
        },
        async getByTitle(req, res){
            const {title} = req.query
            if (!title) {
                return res.status(400).json({ sucess: false, message: "Falta el parámetro de consulta 'título'"})
            }
            try {
                const movies = await Movie.find({title:{$regex: title, $options: "i"}})
                if(!movies.length) {
                    return res.status(404),json({ success: false, message: `La pelicula con el nombre '${title}' no se encuentra en el titulo`})                    
                }
                res.status(200).json({
                    success: true, 
                    message: "Películas por título de consulta",
                    data: movies
                })
            } catch (error) {
                res.status(500).json({ sucess: false, message: `Error interno del servidor --> ${error}`})
    
            }
        }

    }

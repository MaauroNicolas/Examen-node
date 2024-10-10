//parametros para agregar, eliminar o modificar una pelicula 
import { mongoose } from 'mongoose' 
const currYear = new Date().getFullYear()
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true,
        min: [1896, "Year must be al least 1896"],
        max: [currYear, "Year cannot exceed the current year"],
    },

    director: {
        type: String,
        required: true,
        trim: true
    }, 
    
    duration: {
        type: String,
        required: true,
        trim: true
    },
    
    poster: {
        type: String,
        required: true,
        trim: true
    },
    
    genre: {
        type:[String],
        required: true
    },

    rate: {
        type: Number,
        default: 5,
        min: [0, "Minimun rate is 0"],
        max: [10, "Maximus rate is 10"]
    }, 
    }, {
        timestamps: true
    })

MovieSchema.index({ title: "text"})


const Movie = mongoose.model("Movie", MovieSchema)
export default Movie
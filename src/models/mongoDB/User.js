import { mongoose } from "mongoose";
//requisitos para registrar, logear cliente 
const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    { timestamps: true }
)
//esconder contraseña
UserSchema.set("toJSON", {
    transform(_doc, ret){
        delete ret.password
    }
})
const User = mongoose.model("User", UserSchema)
export default User
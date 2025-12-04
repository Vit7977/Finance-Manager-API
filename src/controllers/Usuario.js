import Usuario from "../models/Usuario.js";

const UsuarioController = {
    async getAllUsers(_, res){
        try{
            const result = await Usuario.getAllUsers();

            res.status(200).json({"message": "get users successfully", "users": result })
        }catch(error){
            res.status(500).json(error)
        }
    }
}

export default UsuarioController;
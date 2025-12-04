import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';

const UsuarioController = {
    async getAllUsers(_, res){
        try{
            const result = await Usuario.getAllUsers();

            res.status(200).json({"message": "get users successfully", "users": result })
        }catch(error){
            res.status(500).json(error)
        }
    },

    async createConta(req, res) {
        const { nome, email, senha, data_nasc, cpf, saldo, tipo_conta } = req.body;

        const hashedPass = await bcrypt.hash(senha, 10);
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Campos obrigatórios: nome, email, senha" });
        }
        
        const existingCpfs = await Usuario.getCPF();
        const cpfExists = existingCpfs.some(c => c.cpf === cpf);

        if (cpfExists) {
            return res.status(400).json({ error: "CPF inválido ou já cadastrado" });
        }
        try {

            const result = await Usuario.createConta([
                nome, email, hashedPass, data_nasc, cpf, saldo, tipo_conta
            ]);

            res.status(201).json({
                message: "account and user created successfully",
                result
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno ao criar conta" });
        }
    },
    async login(req, res){
        try{
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Campos obrigatórios: email, senha" });
            }

            const user = await Usuario.getUserByEmail(email);

            if(!user){
                return res.status(404).json({ error: "Usuario não encontrado" });
            }

            const verifyPass = await bcrypt.compare(senha, user[0].senha);

            if(!verifyPass){
                return res.status(401).json({ error: "Email ou senha inválidos" });
            }

            res.status(200).json({ message: "login successful", id: user[0].id, nome: user[0].nome, email: user[0].email });

        }catch(error){
            res.status(500).json(error)
        }
    }   
}

export default UsuarioController;
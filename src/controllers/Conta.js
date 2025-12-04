import Conta from "../models/Conta.js";

const ContaController = {
    async getAllAccounts(_, res){
        try{
            const accounts = await Conta.getAllAccounts();

            res.status(200).json(accounts);
        }catch(error){
            res.status(500).json({message: "Erro ao buscar contas.", error: error.message});
        }
    },
     async getAccountByNum(req, res){
        try{
            const { num } = req.params;
            const account = await Conta.getAccountByNum(num);

            if(account.length === 0){
                return  res.status(404).json({message: "Conta não encontrada."});
            }

            res.status(200).json(account[0]);
        }catch(error){
            res.status(500).json({message: "Erro ao buscar conta.", error: error.message});
        }
    }
}

export default ContaController;
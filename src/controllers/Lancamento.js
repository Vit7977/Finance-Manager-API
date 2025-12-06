import Lancamento from '../models/Lancamento.js';

const LancamentoController = {
    async getAllLaunchments(_, res){
        try{
            const launchments = await Lancamento.getAllLaunchments();

            res.status(200).json({
                message: "get launchments successfully!", 
                data: launchments})
            
        }catch(error){
            res.status(500).json(error);
        }
    }
}

export default LancamentoController;
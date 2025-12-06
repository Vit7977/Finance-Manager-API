import Lancamento from '../models/Lancamento.js';

const LancamentoController = {
    async getAllEntries(_, res){
        try{
            const entries = await Lancamento.getAllEntries();

            res.status(200).json({
                message: "get entries successfully!", 
                data: entries})
            
        }catch(error){
            res.status(500).json(error);
        }
    },

    async getEntriesByAccountNum(req, res){
        const { num_conta } = req.params;
        
        try{
            const entries = await Lancamento.getEntriesByAccountNum(num_conta);
            res.status(200).json({
                message: "get entries by account number successfully!", 
                data: entries})
        }catch(error){
            res.status(500).json(error);
        }
    },
    async getEntryById(req, res){
        const { id } = req.params;

        try{
            const entry = await Lancamento.getEntryById(id);
            res.status(200).json({
                message: "get entry by id successfully!", 
                data: entry})
        }catch(error){
            res.status(500).json(error);
        }
    },

    async createEntry(req, res){
        const { id_usuario, num_conta, id_categoria, descricao, valor } = req.body;

        if( !id_usuario || !num_conta || !id_categoria || !descricao || !valor ){
            return  res.status(400).json({ message: "missing data!" });
        }

        try{
            const entry = await Lancamento.createEntry([
                id_usuario, num_conta, id_categoria, descricao, valor
            ]);

            res.status(201).json({
                message: "entry created successfully!",
                data: entry
            });
        }catch(error){
            res.status(500).json(error);
        }
    },

    async updateEntry(req, res){
        const { id } = req.params;
        const { descricao, valor, id_categoria } = req.body;
        
        if( !descricao || !valor || !id_categoria ){
            return  res.status(400).json({ message: "missing data!" });
        }

        const entryExists = await Lancamento.getEntryById(id);

        if(entryExists.length === 0){
            return res.status(404).json({ message: "entry not found!" });
        }

        try{
            const entry = await Lancamento.updateEntry([
                id_categoria, descricao, valor, id
            ]);

            res.status(200).json({
                message: "entry updated successfully!",
                data: entry
            });
        }catch(error){
            res.status(500).json(error);
        }
    },

    async deleteEntry(req, res){
        const { id } = req.params;

        const entryExists = await Lancamento.getEntryById(id);

        if(entryExists.length === 0){
            return res.status(404).json({ message: "entry not found!" });
        }

        try{
            await Lancamento.deleteEntry(id);

            res.status(200).json({ message: `entry deleted successfully!` });
        }catch(error){
            res.status(500).json(error);
        }
    }
}

export default LancamentoController;
import Lancamento from '../models/Lancamento.js';
import Conta from '../models/Conta.js';
import Categoria from '../models/Categoria.js';

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

    async createEntry(req, res) {
        try {
            const { id_usuario, num_conta, id_categoria, descricao, valor } = req.body;

            if (!id_usuario || !num_conta || !id_categoria || !descricao || !valor) {
                res.status(400).json({ message: "missing data!" });
            }

            const categoria = await Categoria.getNatureById(id_categoria);

            if(categoria.length === 0){
                res.status(404).json({ message: "category not found!" });
            }

            const conta = await Conta.getAccountByNum(num_conta);

            if(conta.length === 0){
                res.status(404).json({ message: "account not found!" });
            }

            let newSaldo;

            if(categoria[0].natureza === 'receita'){
                newSaldo = parseFloat(conta[0].saldo) + parseFloat(valor);
            } 
            else if(categoria[0].natureza === 'despesa'){
                if( parseFloat(conta[0].saldo) < parseFloat(valor) ){
                    res.status(400).json({ message: "insufficient funds!" });
                }
                else{
                    newSaldo = parseFloat(conta[0].saldo) - parseFloat(valor);
                }
            }

            await Conta.updateSaldo(newSaldo, num_conta);

            const entry = await Lancamento.createEntry([
                id_usuario, num_conta, id_categoria, descricao, valor
            ]);

            res.status(201).json({
                message: "entry created successfully!",
                data: entry
            });

        } catch (error) {
            res.status(500).json(error);
        }
    },


    async updateEntry(req, res) {
    try {
        const { id } = req.params;
        const { id_categoria, descricao, valor } = req.body;

        if(!id){
            return res.status(400).json({ message: "missing entry id!" });
        }

        if (!descricao || !valor || !id_categoria) {
            return res.status(400).json({ message: "missing data!" });
        }

        const entryExists = await Lancamento.getEntryById(id);

        if(entryExists.length === 0){
            return res.status(404).json({ message: "entry not found!" });
        }

        const conta = await Conta.getAccountByNum(entryExists[0].conta);

        if(conta.length === 0){
            return res.status(404).json({ message: "account not found!" });
        }

        // Busca a categoria ANTIGA do lançamento
        const categoriaAntiga = await Categoria.getNatureById(entryExists[0].categoria);

        if(categoriaAntiga.length === 0){
            return res.status(404).json({ message: "old category not found!" });
        }

        // Busca a categoria NOVA
        const categoriaNova = await Categoria.getNatureById(id_categoria);

        if(categoriaNova.length === 0){
            return res.status(404).json({ message: "category not found!" });
        }

        let newSaldo = parseFloat(conta[0].saldo);

        //  REVERTE o lançamento antigo
        if(categoriaAntiga[0].natureza === 'receita'){
            if(newSaldo < parseFloat(entryExists[0].valor)){
                return res.status(400).json({ 
                    message: "insufficient funds to revert previous entry!" 
                });
            }
            newSaldo -= parseFloat(entryExists[0].valor);
        } else if(categoriaAntiga[0].natureza === 'despesa'){
            newSaldo += parseFloat(entryExists[0].valor);
        }

        // APLICA o novo lançamento
        if(categoriaNova[0].natureza === 'receita'){
            newSaldo += parseFloat(valor);
        } else if(categoriaNova[0].natureza === 'despesa'){
            if(newSaldo < parseFloat(valor)){
                return res.status(400).json({ 
                    message: "insufficient funds for new entry!" 
                });
            }
            newSaldo -= parseFloat(valor);
        }

        if(newSaldo < 0){
            return res.status(400).json({ message: "insufficient funds!" });
        }
        
        await Conta.updateSaldo(newSaldo, conta[0].num);

        const entry = await Lancamento.updateEntry([
            id_categoria,
            descricao,
            valor,
            id
        ]);

        res.status(200).json({
            message: "entry updated successfully!",
            data: entry
        });

    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        });
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
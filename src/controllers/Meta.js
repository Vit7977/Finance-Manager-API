import Meta from '../models/Meta.js';

const MetaController = {
    async getAllGoals(_, res) {
        try{
            const goals = await Meta.getAllGoals();

            res.status(200).json({message: "get all goals successfully", data: goals});
        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getGoalById(req, res) {
        try{
            const { id } = req.params;

            const goal = await Meta.getGoalById(id);

            res.status(200).json({message: "get goal by id successfully", data: goal});
        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async createGoal(req, res) {
        try{
            const { id_usuario, nome, descricao, valor_alvo, prazo_final } = req.body;

            if(!id_usuario || !nome || !descricao || !valor_alvo || !prazo_final){
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const goal = await Meta.createGoal([id_usuario, nome, descricao, valor_alvo, prazo_final]);

            res.status(201).json({message: "goal created successfully", data: goal});
        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async updateGoal(req, res) {
        try{
            const { id } = req.params;
            const { nome, descricao, valor_alvo, prazo_final } = req.body;

            if(!nome || !descricao || !valor_alvo || !prazo_final){
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const goalExists = await Meta.getGoalById(id);
            if(goalExists.length === 0){
                return res.status(404).json({ error: 'Goal not found' });
            }

            const goal = await Meta.updateGoal([nome, descricao, valor_alvo, prazo_final, id]);

            res.status(200).json({message: "goal updated successfully", data: goal});
        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async deleteGoal(req, res) {
        try{
            const { id } = req.params;

            const goalExists = await Meta.getGoalById(id);
            if(goalExists.length === 0){
                return res.status(404).json({ error: 'Goal not found' });
            }

            await Meta.deleteGoal(id);

            res.status(200).json({message: "goal deleted successfully"});
        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default MetaController;
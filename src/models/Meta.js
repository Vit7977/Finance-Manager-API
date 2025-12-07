import pool from '../db/pool.js';

const Meta = {
    async getAllGoals(){
        try{
            const goals = await pool.promise().execute(`SELECT * FROM meta`);

            return goals[0];
        }catch(error){
            throw error;
        }
    },
    async getGoalById(id){
        try{
            const goal = await pool.promise().execute(`SELECT * FROM meta WHERE id = ?`, [id]);

            return goal[0];
        }catch(error){
            throw error;
        }
    },

    async createGoal(data){
        try{
            const goal = await pool.promise().execute(`CALL meta_create(?, ?, ?, ?, ?)`, data);

            return goal;
        }catch(error){
            throw error;
        }
    },

    async updateGoal(data){
        try{
            const goal = await pool.promise().execute(`CALL meta_update(?, ?, ?, ?, ?)`, data);

            return goal;
        }catch(error){
            throw error;
        }
    },
    async deleteGoal(id){
        try{
            const goal = await pool.promise().execute(`DELETE FROM meta WHERE id = ?`, [id]);

            return goal;
        }catch(error){
            throw error;
        }
    }
}

export default Meta;
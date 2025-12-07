import pool from '../db/pool.js';

const Lancamento = {
    async getAllEntries() {
        try{
            const entries = await pool.promise().execute(`SELECT * FROM lancamento;`)

            return entries[0];
        }catch(error){
            throw error;
        }
    },

    async getEntriesByAccountNum(num_conta){
        try{
            const entries = await pool.promise().execute(
                `SELECT * FROM lancamento WHERE conta = ?;`, 
                [num_conta]
            );

            return entries[0];
        }catch(error){
            throw error;
        }
    },
    async getEntryById(id){
        try{
            const entry = await pool.promise().execute(
                `SELECT * FROM lancamento WHERE id = ?;`, 
                [id]
            );

            return entry[0];
        }catch(error){
            throw error;
        }
    },

    async createEntry(data){
        try{
            const entry = await pool.promise().execute(`CALL lancamento_create(?, ?, ? ,? ,?)`, data);
            
            return entry;
        }catch(error){
            throw error;
        }
    },

    async updateEntry(data){
        try{
            const entry = await pool.promise().execute(`CALL lancamento_update(?, ?, ?, ?)`, data);
            
            return entry;
        }catch(error){
            throw error;
        }
    },

    async deleteEntry(id){
        try{
            const entry = await pool.promise().execute(`DELETE FROM lancamento WHERE id = ?`, [id]);
            
            return entry;
        }catch(error){
            throw error;
        }
    },
};

export default Lancamento;
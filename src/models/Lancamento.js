import pool from '../db/pool.js';

const Lancamento = {
    async getAllLaunchments() {
        try{
            const launchments = await pool.promise().execute(`SELECT * FROM lancamento;`)

            return launchments[0];
        }catch(error){
            throw error;
        }
    }
}

export default Lancamento;
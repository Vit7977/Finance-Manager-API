import pool from '../db/pool.js';

const Usuario = {
    async getAllUsers(){
        try{
            const users = await pool.promise().execute(`SELECT * FROM usuario;`);

            return users[0];
        }catch(error){
            throw error;
        }
    }
}

export default Usuario;
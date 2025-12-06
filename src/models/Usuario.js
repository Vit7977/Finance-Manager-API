import pool from '../db/pool.js';

const Usuario = {
    async getAllUsers(){
        try{
            const users = await pool.promise().execute(`SELECT * FROM usuario;`);

            return users[0];
        }catch(error){
            throw error;
        }
    },

    async getUserByCPF(cpf){
        try{
            const user = await pool.promise().execute(`SELECT * FROM usuario WHERE cpf = ?;`, [cpf]); 

            return user[0];
        } catch(error){
            throw error;
        }
    },

    async getCPF(){
        try{
            const cpfs = await pool.promise().execute(`SELECT cpf FROM usuario;`);

            return cpfs[0];
        }catch(error){
            throw error;
        }
    },

    async getUserByEmail(email){
        try{
            const user = await pool.promise().execute(`SELECT * FROM usuario WHERE email = ?;`, [email]);

            return user[0];
        }catch(error){
            throw error;
        }
    },

    async createAccount(data){
        try{
            const result = await pool.promise().execute(`CALL conta_create(?, ?, ?, ?, ?, ?);`, data);

            return result;
        }catch(error){
            throw error;
        }
    },

    async login(email){
        try{
            const user = await pool.promise().execute(`SELECT id, nome, email, senha FROM usuario WHERE email = ?;`, [email]);

            return user[0];
        }catch(error){
            throw error;
        } 
    },

    async updateUser(data){
        try{
            const newUser = await pool.promise().execute(`CALL usuario_update(?, ?, ?, ?);`, data);

            return newUser;
        }catch(error){
            throw error;
        }
    },

    async deleteUser(id){
        try{
            const result = await pool.promise().execute(`DELETE FROM usuario WHERE id = ?;`, [id]);

            return result;
        }catch(error){
            throw error;
        }
    }
}

export default Usuario;
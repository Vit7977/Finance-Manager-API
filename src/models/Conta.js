import pool from "../db/pool.js";

const Conta = {
    async getAllAccounts(){
        try{
            const accounts = await pool.promise().execute(`SELECT * FROM conta;`);

            return accounts[0];
        }catch(error){
            throw error;
        }
    },
    async getAccountByNum(num){
        try{
            const [account] = await pool.promise().execute(`SELECT * FROM conta WHERE num = ?;`, [num]);

            return account;
        }catch(error){
            throw error;
        }
    },

    async updateStatus(data){
        try{
            const result = await pool.promise().execute(`UPDATE conta SET status = ? WHERE num = ?;`, data);

            return result;
        }catch(error){
            throw error;
        }
    }
}

export default Conta;
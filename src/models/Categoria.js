import pool from '../db/pool.js';

const CategoriaController = {
    async getAllCategories() {
        try {
            const categories =  await pool.promise().execute('SELECT * FROM categoria');

            return categories[0];
        } catch (error) {
            throw error;
        }
    },

    async getNatureById(id) {
        try {
            const nature =  await pool.promise().execute('SELECT natureza FROM categoria WHERE id = ?;', [id]);

            return nature[0];
        } catch (error) {
            throw error;
        }
    }
}

export default CategoriaController;
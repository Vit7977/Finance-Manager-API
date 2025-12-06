import pool from '../db/pool.js';

const CategoriaController = {
    async getAllCategories() {
        try {
            const categories =  await pool.promise().execute('SELECT * FROM categoria');

            return categories[0];
        } catch (error) {
            throw error;
        }
    }
}

export default CategoriaController;
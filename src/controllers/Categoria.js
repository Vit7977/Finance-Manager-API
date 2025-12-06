import Categoria from '../models/Categoria.js';

const CategoriaController = {
    async getAllCategories(_, res) {
        try {
            const categories = await Categoria.getAllCategories();

            res.json({ 
                message: 'Categories retrieved successfully', 
                categories: categories });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    }
}

export default CategoriaController;
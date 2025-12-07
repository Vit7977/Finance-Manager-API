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
    },

    async getNatureById(req, res) {
        const { id } = req.params;
        try {

            if(!id) {
                return res.status(400).json({ error: 'Category ID is required' });
            }

            const categories = await Categoria.getNatureById(id);

            res.json({ 
                message: 'Categories retrieved successfully', 
                data: categories });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    }
}

export default CategoriaController;
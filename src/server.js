import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import UserRouter from './routes/usuario.js'
import AccountRouter from './routes/conta.js'
import CategoriaRouter from './routes/categoria.js'
import LancamentoRouter from './routes/lancamento.js'

const PORT = process.env.API_PORT;

const api = express();

api.use(express.json());
api.use(cors());

api.use("/api/user", UserRouter);
api.use("/api/account", AccountRouter);
api.use("/api/account", AccountRouter);
api.use("/api/category", CategoriaRouter);
api.use("/api/launch", LancamentoRouter);

api.listen(PORT, ()=>{
    console.log(`API opened at http://localhost:${PORT}`);
})

api.get("/", (_, res)=>{
    res.send("API FINANCE MANAGER!");
})
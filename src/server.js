import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import UserRouter from './routes/usuario.js'
import AccountRouter from './routes/conta.js'
import CategoriaRouter from './routes/categoria.js'
import LancamentoRouter from './routes/lancamento.js'
import MetaRouter from './routes/meta.js'

const PORT = process.env.API_PORT;

const api = express();

api.use(express.json());
api.use(cors());

api.use("/api/user", UserRouter);
api.use("/api/account", AccountRouter);
api.use("/api/category", CategoriaRouter);
api.use("/api/entry", LancamentoRouter);
api.use("/api/goal", MetaRouter);

api.get("/", (_, res)=>{
    res.send("API FINANCE MANAGER!");
})

api.listen(PORT, ()=>{
    console.log(`API opened at http://localhost:${PORT}`);
})
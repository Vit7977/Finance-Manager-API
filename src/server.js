import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import UserRouter from './routes/usuario.js'

const PORT = process.env.API_PORT;

const api = express();

api.use(express.json());
api.use(cors());

api.use("/api/user", UserRouter);

api.listen(PORT, ()=>{
    console.log(`API opened at http://localhost:${PORT}`);
})

api.get("/", (_, res)=>{
    res.send("API FINANCE MANAGER!");
})
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import { conectarBD } from './config/Database.js';
import  router  from './routes/pacienteRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';



dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

    app.use(express.static(path.join(__dirname,'../public')));

    app.get('/',(req, res) => {
        const indexPath = path.join(__dirname, '../public','index.html')
        res.sendFile(indexPath)
    })

app.use(express.json());
app.use(cors());

// Conexión a MongoDB
conectarBD();


// Rutas
app.use('/api/auth', authRoute);
app.use('/api/patient', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

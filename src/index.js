import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { userRouter } from "./router/user.router.js";

const localPort = process.env.LOCAL_PORT || 3000;
const app = express();

app.use(express.json())
app.use('/users', userRouter)

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

mongoose.connection.once('open', () => {
  console.log('Conexión completa, conectado correctamente');

app.listen(localPort, () => {
    console.log(`Servidor Express corriendo en el puerto ${localPort}`);
  });
});

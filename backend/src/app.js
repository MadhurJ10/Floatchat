import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import chatRoute from './routes/chat.route.js';


configDotenv()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/c' , chatRoute);

app.get('/', (req, res) => {
    res.send("heheehe");
})



export default app;
import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';


configDotenv()

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("heheehe");
})



export default app;
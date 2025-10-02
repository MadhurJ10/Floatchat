import express from 'express'
import { chat } from '../controller/chat.controller.js';

const router = express.Router();


router.post('/chatt',  chat);


export default router;
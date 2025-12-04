import express from 'express';
import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js';
import { upload } from "../configs/multer.js";
import { protect } from "../middlewares/auth.js";

const messageRouter = express.Router();

// SSE Route (no auth required)
messageRouter.get('/:userId', sseController);

// Send message (Auth → Upload → Controller)
messageRouter.post(
    '/send',
    protect,
    upload.single('image'),
    sendMessage
);

// Get Chat Messages
messageRouter.post(
    '/get',
    protect,
    getChatMessages
);

export default messageRouter;

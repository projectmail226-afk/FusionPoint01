import express from 'express';
import { upload } from '../configs/multer.js';
import { protect } from '../middlewares/auth.js';
import { addPost, getFeedPosts, likePost } from '../controllers/postController.js';

const postRouter = express.Router();

// Add post (Auth → Upload → Controller)
postRouter.post('/add', protect, upload.array('images', 4), addPost);

// Feed posts
postRouter.get('/feed', protect, getFeedPosts);

// Like post
postRouter.post('/likes', protect, likePost);

export default postRouter;

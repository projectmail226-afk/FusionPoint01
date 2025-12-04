import express from 'express';
import { 
    acceptConnectionRequest,
    discoverUsers,
    followUser,
    getUserConnections,
    getUserData,
    getUserProfiles,
    sendConnectionRequest,
    unfollowUser,
    updateUserData
} from '../controllers/userController.js';

import { protect } from '../middlewares/auth.js';
import { upload } from '../configs/multer.js';
import { getUserRecentMessages } from '../controllers/messageController.js';

const userRouter = express.Router();

// User Data
userRouter.get('/data', protect, getUserData);

// Update user profile & cover photo
userRouter.post(
    '/update',
    protect,
    upload.fields([
        { name: 'profile', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
    ]),
    updateUserData
);

// Discover users
userRouter.post('/discover', protect, discoverUsers);

// Follow/Unfollow
userRouter.post('/follow', protect, followUser);
userRouter.post('/unfollow', protect, unfollowUser);

// Connection Request
userRouter.post('/connect', protect, sendConnectionRequest);
userRouter.post('/accept', protect, acceptConnectionRequest);

// Get connections
userRouter.get('/connections', protect, getUserConnections);

// Get user profile (Missing protect — FIXED)
userRouter.post('/profile', protect, getUserProfiles);

// Recent messages for user
userRouter.get('/recent-messages', protect, getUserRecentMessages);

export default userRouter;

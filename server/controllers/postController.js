import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

// Add Post
export const addPost = async (req, res) => {
    try {
        const { userid } = req.auth();
        const { content, post_type } = req.body;
        const images = req.files;

        let image_urls = [];

        // Correct condition
        if (images && images.length) {
            image_urls = await Promise.all(
                images.map(async (img) => {
                    const fileBuffer = fs.readFileSync(img.path);

                    const response = await imagekit.upload({
                        file: fileBuffer,
                        fileName: img.originalname,
                        folder: "posts",
                    });

                    const url = imagekit.url({
                        path: response.filePath,
                        transformation: [
                            { quality: 'auto' },
                            { format: 'webp' },
                            { width: '1280' },
                        ]
                    });

                    return url;
                })
            );
        }

        await Post.create({
            user: userid,
            content,
            image_urls,
            post_type,
        });

        res.json({ success: true, message: "Post created Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Get Feed Posts
export const getFeedPosts = async (req, res) => {
    try {
        const { userid } = req.auth();
        const user = await User.findById(userid);

        const userIds = [userid, ...user.connections, ...user.following];

        const posts = await Post.find({ user: { $in: userIds } })
            .populate('user')
            .sort({ createdAt: -1 });

        res.json({ success: true, posts });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Like Post
export const likePost = async (req, res) => {
    try {
        const { userid } = req.auth();
        const { postId } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.json({ success: false, message: "Post not found" });
        }

        if (post.likes_count.includes(userid)) {
            post.likes_count = post.likes_count.filter(id => id !== userid);
            await post.save();
            res.json({ success: true, message: "Post unliked" });
        } else {
            post.likes_count.push(userid);
            await post.save();
            res.json({ success: true, message: "Post liked" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

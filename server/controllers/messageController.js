import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Message from '../models/Message.js';

// ACTIVE SSE CONNECTIONS
const connections = {};

// =========================
// 🔥 SSE CONTROLLER (FIXED)
// =========================
export const sseController = (req, res) => {
    const { userId } = req.params;

    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log("SSE Connected:", userId);

    // Store connection
    connections[userId] = res;

    // ❌ PROBLEM: earlier code sent `Connected` (NOT valid JSON)
    // res.write(`data: Connected\n\n`);

    // ✅ FIX: Must send valid JSON because frontend uses JSON.parse()
    res.write(`data: ${JSON.stringify({ status: "connected" })}\n\n`);

    // Disconnect
    req.on('close', () => {
        delete connections[userId];
        console.log("SSE Disconnected:", userId);
        res.end();
    });
};

// =========================
// 🔥 SEND MESSAGE
// =========================
export const sendMessage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { to_user_id, text } = req.body;
        const file = req.file;

        let media_url = "";
        let message_type = file ? "image" : "text";

        // If image exists → upload to ImageKit
        if (file) {
            const buffer = fs.readFileSync(file.path);

            const uploaded = await imagekit.upload({
                file: buffer,
                fileName: file.originalname,
            });

            media_url = imagekit.url({
                path: uploaded.filePath,
                transformation: [
                    { quality: "auto" },
                    { format: "webp" },
                    { width: "1280" },
                ]
            });

            fs.unlinkSync(file.path); // delete temp file
        }

        // Create message
        const message = await Message.create({
            from_user_id: userId,
            to_user_id,
            text: text || "",
            message_type,
            media_url
        });

        // Normal API response
        res.json({ success: true, message });

        // Populate sender info for SSE
        const populatedMsg = await Message.findById(message._id)
            .populate("from_user_id");

        // Realtime SSE push
        if (connections[to_user_id]) {
            connections[to_user_id].write(
                `data: ${JSON.stringify(populatedMsg)}\n\n`
            );
        }

    } catch (error) {
        console.log("SendMessage Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// =========================
// 🔥 GET CHAT MESSAGES
// =========================
export const getChatMessages = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { otherUserId } = req.params;

        const messages = await Message.find({
            $or: [
                { from_user_id: userId, to_user_id: otherUserId },
                { from_user_id: otherUserId, to_user_id: userId }
            ]
        }).sort({ createdAt: 1 });

        // Mark messages as seen
        await Message.updateMany(
            { from_user_id: otherUserId, to_user_id: userId, seen: false },
            { $set: { seen: true } }
        );

        res.json({ success: true, messages });

    } catch (error) {
        console.log("GetChatMessages Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// =========================
// 🔥 GET USER RECENT MESSAGES
// =========================
export const getUserRecentMessages = async (req, res) => {
    try {
        const { userId } = req.auth();

        const messages = await Message.find({ to_user_id: userId })
            .populate("from_user_id")
            .sort({ createdAt: -1 });

        res.json({ success: true, messages });

    } catch (error) {
        console.log("GetUserRecent Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

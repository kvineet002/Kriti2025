const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        history: [
            {
                role: {
                    type: String,
                    enum: ["user", "model"],
                    required: true,
                },
                parts: [
                    {
                        text: {
                            type: String,
                            required: true,
                        },
                    },
                ]
            },
        ],
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

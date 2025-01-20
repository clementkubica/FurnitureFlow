import React from "react";
import "../styles/MessageBubble.css";

function MessageBubble({ text, timestamp, isSender }) {
    return (
        <div
            className={`flex ${
                isSender ? "justify-end" : "justify-start"
            } my-2`}
        >
            <div
                className={`p-3 max-w-xs md:max-w-md lg:max-w-lg rounded-lg shadow ${
                    isSender ? "bg-purple-400 text-white" : "bg-gray-200 text-gray-800"
                }`}
                style={{
                    wordWrap: "break-word", // Ensures long words wrap within the bubble
                    overflowWrap: "break-word", // Handles text wrapping across all browsers
                }}
            >
                <p className="whitespace-pre-wrap">{text}</p> {/* Preserves line breaks */}
                <span className="block text-xs mt-1 text-gray-800">
                    {new Date(timestamp).toLocaleTimeString()}
                </span>
            </div>
        </div>
    );
}

export default MessageBubble;

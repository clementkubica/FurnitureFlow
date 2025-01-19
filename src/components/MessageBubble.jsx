import React from "react";
import "../styles/MessageBubble.css"

function MessageBubble({text, timestamp, isSender}) {
    return (
        <div
            className={`flex ${
                isSender ? "justify-end" : "justify-start"
            } my-2`}
        >
            <div
                className={`p-3 max-w-xs rounded-lg shadow ${
                    isSender ? "bg-purple-500 text-white" : "bg-gray-200 text-white"
                }`}
            >
                <p>{text}</p>
                <span className="block text-xs mt-1 text-gray-500">
                    {new Date(timestamp).toLocaleTimeString()}
                </ span>
            </div>
        </ div>
    )
}
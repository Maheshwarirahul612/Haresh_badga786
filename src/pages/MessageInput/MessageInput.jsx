// components/MessageInput.jsx
import React, { useState } from 'react';
import { Picker } from 'emoji-mart';

const MessageInput = ({ onSend, onTyping }) => {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSend = () => {
    if (content.trim()) {
      onSend(content);
      setContent('');
      setShowEmojiPicker(false);
    }
  };

  const addEmoji = (emoji) => {
    setContent(content + emoji.native);
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-2xl">
        😀
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4">
          <Picker onSelect={addEmoji} />
        </div>
      )}
      <input
        type="text"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          onTyping();
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        className="flex-1 p-2 rounded-lg border"
      />
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Send
      </button>
    </div>
  );
};

export default MessageInput;

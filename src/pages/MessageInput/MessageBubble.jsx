const MessageBubble = ({ message, self, onMessageSeen }) => {
  return (
    <div className={`flex ${self ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg text-white ${self ? 'bg-blue-500' : 'bg-gray-600'}`}
        style={{ position: 'relative' }}
      >
        <div>{message.content}</div>
        <div className="text-xs text-gray-400 text-right mt-1">{new Date(message.createdAt).toLocaleTimeString()}</div>

        {message.isRead && !self && (
          <div className="absolute bottom-0 right-0 text-xs text-green-400">Seen</div>
        )}

        {!message.isRead && !self && (
          <div className="absolute bottom-0 right-0 text-xs text-gray-400">Delivered</div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

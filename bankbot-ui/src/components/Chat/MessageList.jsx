
import './MessageList.css';

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.role}`}
        >
          <b>{msg.role === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default MessageList;


import './MessageInput.css';

function MessageInput({ input, setInput, onSend }) {
  return (
    <form className="message-form" onSubmit={onSend}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="2"
        className="message-input"
        placeholder="Type your message..."
      /><br />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
}

export default MessageInput;

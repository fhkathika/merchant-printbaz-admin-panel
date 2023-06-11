
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportTicketChatbox = () => {
    const [chatLog, setChatLog] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
      // Fetch the chat log from the server when the component mounts
      fetchChatLog();
    }, []);
  
    const fetchChatLog = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getmessages');
          setChatLog(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      
    const handleSendMessage = async (e,message) => {
        e.preventDefault();
        try {
          const newMessage = { message, sender: 'user' };
          const response = await axios.post('http://localhost:5000/sendmessages', newMessage);
          // Update the chat log with the message received from the server
          setChatLog([...chatLog, response.data]);
        } catch (err) {
          console.error(err);
        }
        setNewMessage('');
      };
      
      const handleNewMessageChange = (e) => {
          console.log(e.target.value);
        setNewMessage(e.target.value);
      };
     console.log("newMessage",newMessage); 
  return (
    <div>
    <div className="chat-messages p-4">
      {chatLog.map(msg => (
        <div className={msg.sender === 'user' ? 'chat-message-right pb-4' : 'chat-message-left pb-4'}>
          <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt={msg.sender} width={40} height={40} />
            <div className="text-muted small text-nowrap mt-2">{new Date(msg.id).toLocaleTimeString()}</div>
          </div>
          <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div className="font-weight-bold mb-1">{msg.sender}</div>
            {msg.message}
          </div>
        </div>
      ))}
    </div>

    <form onSubmit={handleSendMessage}>
        <input 
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default SupportTicketChatbox;

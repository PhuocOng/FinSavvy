import ChatbotIcon from "../../components/ChatBot/Chatboticon";
import './ChatBot.css'
import ChatForm from "../../components/ChatBot/ChatForm"
import ChatMessage from "../../components/ChatBot/ChatMessage"
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from 'react-toastify'; 
import axios from "axios";

const backendUrl = import.meta.env.VITE_API_BASE_URL;


const ChatBot = () => {
    const [chatHistory, setChatHistory] = useState([]);
    const [showChatBot, setShowChatBot] = useState(false);
    const chatBodyRef = useRef();

    const generateBotResponse = async (history) => {
        try {
        const updateHistory = (text = false) => {
            setChatHistory ((prev) => [...prev.filter((msg) => msg.text!== "Thinking..."), {role: "system", text}]); 
        };

        //Format chat history for API request
        const formattedHistory = history.map(({role,text})=>({role, content: text}));

        const response = await axios.post(backendUrl+ '/api/gpt/advice', {
                prompt: formattedHistory
            });

        //Clean and update chat history with bot's response
            const apiReponseText = response.data.reply;
            updateHistory(apiReponseText);
            toast.success("Bot response received!");
        } catch (error){
            const message = error.response?.data?.error?.message || error.message || "Something went wrong";
            toast.error(`Error: ${message}`);
        }
    };
    
    useEffect(() => {
        chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
    }, [chatHistory]);

    return ( 
        <div className={`container ${showChatBot ? "show-chatbot" : "" }`}>
            <button onClick={() => setShowChatBot(prev => !prev)} className="chatbot-toggler">
                <span className="material-symbols-rounded">{showChatBot ? "close" : "mode_comment"}</span>
                 <span className="material-symbols-rounded">close</span>
            </button>

            <div className="chatbot-popup">
                {/* Chatbot Header*/}
                <div className="chat-header">
                    <div className="header-info">
                        <ChatbotIcon />
                        <h2 className="logo-text">Chatbot</h2>
                    </div>
                    <button 
                    className="material-symbols-rounded">keyboard_arrow_down</button>       
                </div>

                {/* Chatbot Body*/}
                <div ref={chatBodyRef} className="chat-body">
                    <div className="message bot-message">
                        <ChatbotIcon />
                        <p className="message-text">Hey there! <br /> How can I help you today?
                        </p>
                    </div>
                     {/* Render the chat history dynamically*/}
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat}/>
                    ))}
                    
                </div>

                {/* Chatbot Footer*/}
                <div className="chat-footer">
                    <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                </div>
            </div>
        </div>
     );
};
 
export default ChatBot;
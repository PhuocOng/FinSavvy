import ChatbotIcon from "./Chatboticon";

const ChatMessage = ({chat}) => {
    return ( <div className={`message ${chat.role === "system" ? 'bot' : 'user'}-message ${chat.isError ? "error" : ""}`}>
                {chat.role === "system" && <ChatbotIcon />}
                <p className="message-text">{chat.text}</p>
            </div> );
}
 
export default ChatMessage
;
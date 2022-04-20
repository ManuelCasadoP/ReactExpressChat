import Messages from "../components/Messages";
import SendMessages from "../components/SendMessage";

function ChatView () {
    return (
        <>
            <h1>Chat</h1>
            <Messages/>
            <SendMessages/>
        </>
    )
}

export default ChatView
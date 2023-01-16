import { ChatState } from "../Context/chatProvider";

const ChatPage = () => {
    const { user } = ChatState();
    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
        </div>
    );
};

export default ChatPage
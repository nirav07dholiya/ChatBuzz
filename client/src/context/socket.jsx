import { createContext, useContext, useRef, useEffect } from "react";
import useAppStore from "@/store";
import { io } from "socket.io-client"; 

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo} = useAppStore();
    useEffect(() => {
        if (userInfo) {
            socket.current = io("http://localhost:8747", {
                withCredentials: true,
                query: {
                    userId: userInfo.id,
                }
            })
            socket.current.on("connect", () => {
                console.log("Connected to socket server.");
            })

            const handleRecieveMessages = (message) => {
                const { selectedChatType, selectedChatData, addMessage } = useAppStore.getState();

                if (selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)){

                    console.log("messages rcv",message);
                    addMessage(message);
                }
            }

            socket.current.on("recieveMessage", handleRecieveMessages);

            return () => {
                socket.current.disconnect();
            }
        }

    }, [userInfo])

    return (
        <>
            <SocketContext.Provider value={socket.current}>
                {children}
            </SocketContext.Provider>
        </>
    )
}
export default SocketProvider;
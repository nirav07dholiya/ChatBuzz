// import { lazy } from "react"
import ChatHeader from "./components/chat-header"
// const ChatHeader = lazy(()=>import('./components/chat-header'))
import MessagesContainer from "./components/messages-container"
// const MessagesContainer = lazy(()=>import('./components/messages-container'))
import MessagesBar from "./components/messages-bar"
// const MessagesBar = lazy(()=>import('./components/messages-bar'))

const ChatContainer = () => {
  return (
    <div className='fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1'>
      <ChatHeader />
      <MessagesContainer />
      <MessagesBar />
    </div>
  )
}

export default ChatContainer
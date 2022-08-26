import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext()
const ChatProvider = ({ children }) => {
    const navigate = useNavigate()
    const [users, setUsers] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats,setChats]=useState([])
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))??""
 
        setUsers(userInfo)

        if (!userInfo) {
            navigate('/')

        }

    }, [navigate])

    return <ChatContext.Provider value={{ users, setUsers, selectedChat, setSelectedChat,chats,setChats }}>{children}</ChatContext.Provider>
}

export const ChatState = () => {

    return useContext(ChatContext)
}

export default ChatProvider
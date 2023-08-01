import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext.js'
import Message from './Message.jsx'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

function Messages(){
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)

    useEffect(() => {
        //Collecting the data from the chats collection, from the joint id created
        const unsub = onSnapshot(doc(db,"chats", data.chatId), (doc)=>{
            //This means that messages will only be set to doc.data() if the doc exists in the first place
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub()
        }
    },[data.chatId])

    return(
        <div className="messages">
            {/* Looping through the messages array and outputting each message */}
            {messages.map((message) => (
                <Message message={message} key={message.id}/>
            ))}
        </div>
    )
}

export default Messages
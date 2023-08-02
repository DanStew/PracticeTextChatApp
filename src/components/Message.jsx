//Importing images into this component
import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, serverTimestamp } from 'firebase/firestore'

function Message({message}){

    //Collecting both users information
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    //UseRef is used to implement smooth scrolling when a new message is sent
    const ref = useRef()

    //Function to implement the smooth scrolling
    //Implemented for every new message sent on the system
    useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
    },[message])

    //Function to return the correct time to the users screen
    function findTime(){ 
        const timeSent = message.date.seconds
        const timeNow = Timestamp.now().seconds
        const timeAgo = timeNow - timeSent;
        let roundedTime = Math.round(timeAgo)
        let output = ""
        if (timeAgo < 5){
            output = "Just Now"
        }
        else if (timeAgo < 60){
            output = roundedTime + " seconds ago"
        }
        else{
            roundedTime = Math.floor(roundedTime / 60)
            if (roundedTime < 60){
                output = roundedTime + " minutes ago"
            }
            else{
                roundedTime = Math.floor(roundedTime / 60)
                roundedTime < 24 ? output = roundedTime + " hours ago " : output= "A while ago"
            }
        }

        return output
    }

    return(
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span>{findTime()}</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message
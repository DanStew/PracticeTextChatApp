import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { ChatContext } from '../context/ChatContext.js'


function Chats(){

    const [chats,setChats]= useState([])

    const {currentUser} = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(()=> {
        const getChats = () => {
            //Collects the realtime data from the collection using the onSnapshot function
            const unsub = onSnapshot(doc(db,"userChats",currentUser.uid), (doc) => {
                setChats(doc.data())
            })

            //Cleanup function to stop memory leaking
            return () => {
                unsub();
            }
        }
        //Used to ensure function is only called if the user is signed in (there is a current user)
        currentUser.uid && getChats()
    },[currentUser.uid])

    function handleSelect(u){
        console.log(u)
        dispatch({type:"CHANGE_USER", payload:u})
    }

    return(
        <div className="chats">
            {/* Object.entries turns the object that the unsub function returns and puts it into an array, so it can be used */}
            {/* Key = chat[0] is  used as this is the unique id for the array*/}
            {/* The sort method here is to sort the data in order of recency */}
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
            ))}  
        </div>
    )
}

export default Chats
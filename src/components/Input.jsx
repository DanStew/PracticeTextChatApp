//Importing images into this component
import imgIcon from '../img/imgIcon.jpg'
import attach from '../img/attach.jpg'

//Importing needed functions into the code
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

function Input(){

    //Making the useState variables for the inputs from the user
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    //Creating the variables for the users information
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

    async function handleSend(){
        //Checking if the user is trying to send a file or not
        if (img){
            const storageRef = ref(storage, uuid())
            const uploadTask = uploadBytesResumable(storageRef,img)

            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        //Updating the document to include the new text sent by the user
                        await updateDoc(doc(db,"chats",data.chatId),{
                            messages: arrayUnion({
                            //Creating a unique id for each text sent
                            id: uuid(),
                            text,
                            //Sender id is current user as you can only send messages from your account
                            senderId: currentUser.uid,
                            //For some reason you cant use serverTimestamp here
                            date: Timestamp.now(),
                            img : downloadURL,
                        })
                    })
                })
                }
            )
        }
        //Just send the text the user inputs to the database
        else{
            //Updating the document to include the new text sent by the user
            await updateDoc(doc(db,"chats",data.chatId),{
                messages: arrayUnion({
                    //Creating a unique id for each text sent
                    id: uuid(),
                    text,
                    //Sender id is current user as you can only send messages from your account
                    senderId: currentUser.uid,
                    //You can't use serverTimestamp within the arrayUnion function
                    date: Timestamp.now()
                })
            })
        }

        //Updating the latest message in the userChats collection
        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId+".lastMessage"] :{
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId+".lastMessage"] :{
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })
        setText("")
        setImg(null)
    }

    return(
        <div className="input">
            <input type="text" placeholder="Type Something..." onChange={e=> setText(e.target.value)} value={text}/>
            <div className="send">
                <img src={attach} alt="" />
                <input style={{display:"none"}} type="file" id="file" onChange={(e) => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <img src={imgIcon} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input
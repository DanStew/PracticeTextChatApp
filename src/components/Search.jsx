import { useContext, useState } from 'react'
import { db } from '../firebase.js'
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { AuthContext } from '../context/AuthContext.js'
import { ChatContext } from '../context/ChatContext.js'

function Search(){

    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

    async function handleSearch(){
        //Querying the database to see if anyone == the username entered
        const q = query(collection(db, "users"), where("displayName", "==", username))
        //Using the query
        try{
            //Collecting the data from the query
            const querySnapshot = await getDocs(q)
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                //Setting the user to the data that we got from the query
                setUser(doc.data())
            })
        }catch (err){
            setErr(true)
        }
    }

    function handleKey(e){
        //Seeing if the user has entered enter on the keyboard
        //If so, handleSearch is called
        e.code === "Enter" && handleSearch();
    }

    //Function that handles when a user selects on another user
    async function handleSelect(user){
        //Check whether the group (chats) exists or not
        //If it doesn't exist, create a new one.


        //To create a unique id for each chat, a combination of both users in the chat id's will be connected
        //This logic is used so that the key will always be the same, no matter who selects or makes the chat
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try{
            //Seeing if the users documents already exist
            const res = await getDoc(doc(db, "chats", combinedId))

            //Checking if the id exists or not
            if (!res.exists()){
                //All of this code runs if the document doesn't exist
                //Creating a chat in chats collection
                await setDoc(doc(db, "chats",combinedId),{messages:[]})
                //Create user chats
                //This is done twice as each users userChats record is updated with the new chat that they are in
                await updateDoc(doc(db,"userChats",currentUser.uid),{
                    //The below code is how you implement nested objects within records
                    //The other users personal information is stored so it can be accessed, ie in the preview
                    [combinedId+".userInfo"] : {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    //ServerTimeStamp is used as it is the best way of getting the time (takes into account timezones)
                    [combinedId+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db,"userChats",user.uid),{
                    [combinedId+".userInfo"] : {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
            }
        }catch(err){
            setErr(true)
        }
        //Setting the search components data to default
        setUser(null)
        setUsername("")

        //Using the ChatContext to change the user
        console.log(user)
        dispatch({type:"CHANGE_USER", payload:user})
    }

    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder='Find a user...' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username}/>
            </div>
            {/* Implementing the error code onto the app */}
            {err && <span>User not found</span>}
            {/* Only displaying the following code if a user is found */}
            {user && <div className="userChat" onClick={() => handleSelect(user)}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search
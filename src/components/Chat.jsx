//Importing Images into the file
import camera from '../img/camera.jpg'
import addFriend from '../img/addFriend.jpg'
import options from '../img/threeDots.jpg'

//Importing components into the file
import Messages from './Messages.jsx'
import Input from './Input.jsx'

//Importing needed functions into the code
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

function Chat(){

    const {data} = useContext(ChatContext)
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={camera} alt="Camera" />
                    <img src={addFriend} alt="Add Friend" />
                    <img src={options} alt="Options" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat
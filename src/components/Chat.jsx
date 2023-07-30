//Importing Images into the file
import camera from '../img/camera.jpg'
import addFriend from '../img/addFriend.jpg'
import options from '../img/threeDots.jpg'

//Importing components into the file
import Messages from './Messages.jsx'
import Input from './Input.jsx'

function Chat(){
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>Jane</span>
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
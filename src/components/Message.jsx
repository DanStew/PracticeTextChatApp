//Importing images into this component
import ProfileImg from '../img/profilePic.jpg'

function Message(){
    return(
        <div className='message owner'>
            <div className="messageInfo">
                <img className="chatProfileImg" src={ProfileImg} alt="" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                <img className="sentImage" src={ProfileImg} alt="" />
            </div>
        </div>
    )
}

export default Message
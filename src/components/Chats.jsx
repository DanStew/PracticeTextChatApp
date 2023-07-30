import profileImg from '../img/profilePic.jpg'

function Chats(){
    return(
        <div className="chats">
            <div className="userChat">
                <img className="displayImg" src={profileImg} alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p className="chatTextPreview">Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img className="displayImg" src={profileImg} alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p className="chatTextPreview">Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img className="displayImg" src={profileImg} alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p className="chatTextPreview">Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats
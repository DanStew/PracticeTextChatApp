import profileImg from '../img/profilePic.jpg'

function Chats(){
    return(
        <div className="chats">
            <div className="userChat">
                <img src={profileImg} alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src={profileImg} alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src={profileImg} alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats
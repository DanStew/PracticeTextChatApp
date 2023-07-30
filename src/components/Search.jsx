import profileImg from '../img/profilePic.jpg'

function Search(){
    return(
        <div className="search">
            <div className="searchForm">
                <input className="searchInput" type="text" placeholder='Find a user...'/>
            </div>
            <div className="userChat">
                <img className="displayImg" src={profileImg} alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                </div>
            </div>
        </div>
    )
}

export default Search
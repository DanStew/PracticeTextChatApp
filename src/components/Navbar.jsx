import profileImg from '../img/profilePic.jpg'

function Navbar(){
    return(
        <div className="navbar">
            <span className="logo">Text Chat App</span>
            <div className="user">
                <img src={profileImg} alt="" />
                <span>John</span>
                <button>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar
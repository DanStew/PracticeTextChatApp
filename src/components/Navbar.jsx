import './Components.css'
import profileImg from '../img/profilePic.jpg'

function Navbar(){
    return(
        <div className="navbar">
            <span className="logo">Text Chat App</span>
            <div className="user">
                <img className="profileImg" src={profileImg} alt="" />
                <span className='username'>John</span>
                <button className='logOut'>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar
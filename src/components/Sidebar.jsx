//Importing other components in
import Navbar from './Navbar.jsx'
import Search from './Search.jsx'
import Chats from './Chats.jsx'

function Sidebar(){
    return(
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Sidebar
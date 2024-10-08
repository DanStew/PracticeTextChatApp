//Importing components into the page
import Sidebar from '../components/Sidebar.jsx'
import Chat from '../components/Chat.jsx'

function Home(){
    return(
        <div className='home'>
            <div className='container'>
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Home
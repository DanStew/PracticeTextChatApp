//Importing images into this component
import imgIcon from '../img/imgIcon.jpg'
import attach from '../img/attach.jpg'

function Input(){
    return(
        <div className="input">
            <input type="text" placeholder="Type Something..."/>
            <div className="send">
                <img src={attach} alt="" />
                <input style={{display:"none"}} type="file" id="file"/>
                <label htmlFor="file">
                    <img src={imgIcon} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input
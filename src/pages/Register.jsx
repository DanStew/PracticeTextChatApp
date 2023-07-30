import imgIcon from '../img/imgIcon.jpg'

function Register(){
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Text Chat App</span>
                <span className="title">Register</span>
                <form>
                    <input type="text" placeholder="Display Name..."/>
                    <input type="email" placeholder="Email..."/>
                    <input type="password" placeholder="Password..."/>
                    {/* Code below is used to hide the form input field, as it looks ugly */}
                    <input style={{display:"none"}}type="file" id="file"/>
                    {/* Code below replaces the hidden input with alternative elements and styling
                        The elements below will function as if it was the file input still, just look different */}
                    <label htmlFor='file'>
                        <img src={imgIcon} alt=""/>
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign Up</button>
                </form>
                <p>You do have an account? <a href="">Login</a></p>
            </div>
        </div>
    )
}

export default Register
import './pagesCss/Register.css'

function Login(){
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Text Chat App</span>
                <span className="title">Login</span>
                <form>
                    <input type="email" placeholder="Email..."/>
                    <input type="password" placeholder="Password..."/>
                    <button>Sign In</button>
                </form>
                <p>You don't have an account? <a href="">Register</a></p>
            </div>
        </div>
    )
}

export default Login
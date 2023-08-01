import {auth} from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Login(){
    //Setting the error variable so it can conditionally render if needed
    const [err,setErr] = useState(false)

    //Using React-Router-Dom to navigate between components
    const navigate = useNavigate()

    //This is the function that is used to handle the inputs from the user
    async function handleSubmit(e){
        //This prevents the page from refreshing when the button is pressed
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
            await signInWithEmailAndPassword(auth, email,password);
            navigate("/")
        } catch(err){
            setErr(true)
        }
    }

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Text Chat App</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email..."/>
                    <input type="password" placeholder="Password..."/>
                    <button>Sign In</button>
                    {err && <span>Something Went Wrong...</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login
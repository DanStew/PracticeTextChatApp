//Importing needed components for firebase activities
import { auth, storage, db } from '../firebase.js'
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom';

import imgIcon from '../img/imgIcon.jpg'


function Register(){
    //Setting the error variable so it can conditionally render if needed
    const [err,setErr] = useState(false)

    //Using React-Router-Dom to navigate between components
    const navigate = useNavigate()

    //This is the function that is used to handle the inputs from the user
    //An alternative of this function is to make a useState variable for each of the variables
    //Therefore this is used as it is easier
    async function handleSubmit(e){
        //This prevents the page from refreshing when the button is pressed
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            //Code to create the user onto the site
            const res= await createUserWithEmailAndPassword(auth, email, password)
            
            //Code to store and set the users profile img
            //The second parameter here is the name of the file that you are going to store
            const storageRef = ref(storage, displayName)
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on(
                (error) => {
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateProfile(res.user,{
                            displayName,
                            photoURL : downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid),{
                            uid : res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        })

                        await setDoc(doc(db, "userChats", res.user.uid), {})

                        //Code that sends the user to the / path (Home Page)
                        navigate("/")
                    })
                }
            )

        } catch(err){
            setErr(true)
        }
    }

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Text Chat App</span>
                <span className="title">Register</span>
                <form onSubmit ={handleSubmit}>
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
                    {err && <span>Something Went Wrong...</span>}
                </form>
                <p>You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register
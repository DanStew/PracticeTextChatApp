import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from '../firebase.js'

//Creating a context for the authentication
export const AuthContext = createContext()

//Creating a provider
//The {children} represent the component
export const AuthContextProvider = ({children}) =>{
    //Creating the currentUsers of the site
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() =>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user)
            console.log(user)
        });

        //The code is implemented this way as, without a cleanup function, there will be memory leaking from the function
        return () =>{
            unsub()
        }
    },[]);

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
};


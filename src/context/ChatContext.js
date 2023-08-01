import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext, useReducer } from "react";
import { auth } from '../firebase.js'
import { AuthContext } from "./AuthContext.js";

//Creating a context for the authentication
export const ChatContext = createContext()


//Creating a provider
//The {children} represent the component
export const ChatContextProvider = ({children}) =>{
    const {currentUser} = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId : "null",
        user: {}
    }

    //Function that changes the state, using the action defined to it
    const chatReducer = (state,action) =>{
        // A switch is used here in case we wanted to add additional functionality to the website, like blocking a user
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user : action.payload,
                    chatId : currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            default: 
                return state
        }
    }

    const [state,dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return(
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
};
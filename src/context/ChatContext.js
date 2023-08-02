import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, useContext, useReducer } from "react";
import { auth } from '../firebase.js'
import { AuthContext } from "./AuthContext.js";

//Creating a context for the authentication
export const ChatContext = createContext()


//Creating a provider
//The {children} represent the component
export const ChatContextProvider = ({children}) =>{
    //Finding the current user of the site
    const {currentUser} = useContext(AuthContext)

    //Initialising the initial state that we will return
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
                    //Setting the user part of the record to be the othere users information, passed into this function as action
                    user : action.payload,
                    //Setting the chatId to be the joint id of the two users
                    chatId : currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }
            //Default case is needed to be returned
            default: 
                return state
        }
    }

    //Defining the useReducer function
    const [state,dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return(
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
};
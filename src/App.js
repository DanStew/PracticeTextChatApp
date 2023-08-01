//As only 1 scss file is being used, it can be imported here and then used throughout the entire site
import './style.scss'

import{ BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' 
import { AuthContext } from './context/AuthContext';
import { useContext} from "react"

//Importing the components to be used in the app
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  const {currentUser} = useContext(AuthContext)
  
  //This creates a protected route for the home page
  //Means user has to be logged in in order for the home page to display
  const ProtectedRoute = ({children}) =>{
    if (!currentUser){
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route 
            index 
            element={
              <ProtectedRoute >
                  <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

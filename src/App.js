//As only 1 scss file is being used, it can be imported here and then used throughout the entire site
import './style.scss'

import{ BrowserRouter, Routes, Route } from 'react-router-dom' 

//Importing the components to be used in the app
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

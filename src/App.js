//As only 1 scss file is being used, it can be imported here and then used throughout the entire site
import './style.scss'

//Importing the components to be used in the app
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;

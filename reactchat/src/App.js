import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Messages from './components/Messages';

function App() {

    const [readId, setId] = useState("");
    const [readPass, setPass] = useState("");
    const [login, setLogin ] = useState(true);
    
  return (
    <>
      { login ? 
        (     <Login 
                  sendId={setId} 
                  sendPass={setPass} 
                  setLogin={setLogin} 
              />
        ) : (
              <Messages 
                  id={readId} 
                  pass={readPass}
              />
        )
      }
    </>
  );
}

export default App;

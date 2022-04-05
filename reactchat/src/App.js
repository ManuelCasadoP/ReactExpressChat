import './App.css';
import Login from './components/Login';
import Messages from './components/Messages';
import SendMessage from './components/SendMessage';


function App() {

    
  return (
    <>
      <Login />
      <Messages id={1649185257924} pass={123456}/>
      <SendMessage id={1649185257924} pass={123456}/>
    </>
  
  );
}

export default App;

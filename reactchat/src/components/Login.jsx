import './Login.css'
import { useState } from 'react';


const Login = ()=>{

    const [ user, keepUser ] = useState("");
    const [ pass, keepPass ] = useState("");

    function getUserDataButtonHandler(){
        const urlLogin="https://web-develop-react-express-chat.herokuapp.com/login/"
        let userData=JSON.stringify({userName: user, password: pass});
        console.log("Enviando datos de alta de usuario...")
        console.log(user + " , " +  pass);
        setUserPost(urlLogin, userData);
        //return pass;
    }

    function setUser(event){
        keepUser(event.target.value);
    }

    function setPass(event){
        keepPass(event.target.value);
    }
    

    async function setUserPost(urlLogin, userData) {
        const response = await fetch(
            urlLogin,
            {
                method: 'POST',
                body: userData,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const responseData = await response.json();
        console.log(responseData);
        //id = responseData;
        return responseData;
    }

    return (

        <div className="container">
            <h1>Alta Usuario</h1>
            <label for="user">Usuario:</label><br></br>
            <input type="text" id="user" name="user" onChange={setUser}></input><br></br>
            <label for="pass">Password:</label><br></br>
            <input type="password" id="pass" name="pass" onChange={setPass}></input><br></br><br></br>
            <button type="button" onClick={getUserDataButtonHandler}>Enviar</button>
        </div>

    )
}

export default Login;
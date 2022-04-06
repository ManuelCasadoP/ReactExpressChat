import { useState, useEffect } from 'react';


const Login = ()=>{

    const [ user, keepUser ] = useState("");
    const [ pass, keepPass ] = useState("");
    const [ id, setId ] = useState ("");

    function getUserDataButtonHandler(){
        const urlLogin="https://web-develop-react-express-chat.herokuapp.com/login/"
        let userData=JSON.stringify({userName: user, password: pass});
        console.log("Enviando datos de alta de usuario...")
        //console.log(user + " , " +  pass);
        setUserPost(urlLogin, userData);
        //keepUser("");
        //keepPass("");
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
        //console.log(responseData);
        setId(responseData);
    }
    
    useEffect(
        ()=>{
          if (id === ""){ }
          else {
                console.log(`user: ${user}`);
                console.log(`password: ${pass}`);
                console.log(`id: ${id}`);
                keepUser("");
                keepPass("");
        }}, [id]
      )

    return (

        <div className="container">
            <h1>Alta Usuario</h1>
            <label htmlFor="user">Usuario:</label>
            <input type="text" className='input' name="user" value={user} onChange={setUser}></input>
            <label htmlFor="pass">Password:</label>
            <input type="password" className='input' name="pass" value={pass} onChange={setPass}></input><br></br>
            <button type="button" className='button' onClick={getUserDataButtonHandler}>Enviar</button>
        </div>

    )
}

export default Login;
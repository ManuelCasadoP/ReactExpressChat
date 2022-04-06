import { useState } from "react";

const SendMessages=({id, pass})=>{

    const [ sendMessage, setSendMessage ] = useState ("");

    function sendMessageButtonHandler(){
        const urlLogin="https://web-develop-react-express-chat.herokuapp.com/message/"
        const message = JSON.stringify({"content": sendMessage});
        const token = authToken(id, pass);
        console.log(id);
        console.log(pass);
        console.log(token);
        console.log(urlLogin);
        console.log(message);
        authPost(urlLogin, token, message);
        console.log("Enviando Mensaje....");
        setSendMessage("");
    }

    function getMessage(event){
        setSendMessage(event.target.value);

    }


    function authToken(id, secret) {
        // En autenticación Basic, usuario y contraseña se separan con ':'
        const authToken = `${id}:${secret}`;
        // Y se codifican en Base64
        const base64token = btoa(authToken);
        return `Basic ${base64token}`;
    }

    /**
     * POST con autenticación
     */
    async function authPost(url, token, data) {
    const response = await fetch(
        url,
        {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }
    );
    const responseData = await response.json();
    return responseData;
}

    return (

        <div className="container">
            <h1>Enviar Mensaje</h1>
            <textarea className="textarea" cols="60" rows="10" onChange={getMessage} value={sendMessage}></textarea>
            <button type="button" className="button" onClick={sendMessageButtonHandler}>Enviar</button>
        </div>

    );
}

export default SendMessages;
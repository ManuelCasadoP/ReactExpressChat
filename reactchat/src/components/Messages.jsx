import { useEffect, useRef, useState } from "react";

const Messages = ({id, pass})=>{

    const [ messages, setMessages ] = useState ("");
    const interval = useRef(0);

    let htmlGetMessages=("");

    // Función que genera un token al proporcionarle un id y una password de usuario creado.
    function authToken(id, secret) {
        // En autenticación Basic, usuario y contraseña se separan con ':'
        const authToken = `${id}:${secret}`;
        // Y se codifican en Base64
        const base64token = btoa(authToken);
        return `Basic ${base64token}`;
    }

    /**
     * GET con autenticación
     */
    async function authGet(url, token) {
        const response = await fetch(
            url,
            { 
                headers: {
                    Authorization: token
                }
            }
        );
        const data = await response.json();
        return data;
    }

    /* Hook que llama a la función setInterval para que cada 10 segundos_
     ejecute la función getMessageHandler para leer los mensajes */
    useEffect(() => {

        if ( interval.current !== 0 ) clearInterval(interval.current)

        interval.current = setInterval(() => {

          //Leer mensajes cada 10 segundos.
          
          getMessageHandler(id, pass);

        }, 10000);
      }, [id, pass]);
    
    // Función que genera un token para leer los mensajes con autenticación.  
    function getMessageHandler(id, pass){
        const urlLogin="https://web-develop-react-express-chat.herokuapp.com/messages/"
        const token = authToken(id, pass);
        authGet(urlLogin, token).then(data => htmlGetMessages = JSON.stringify(data));
        setMessages(htmlGetMessages); 
        console.log("Leyendo Mensajes....");
        console.log(htmlGetMessages);
        console.log(token);
    }
    
    return (

        <div className="container">
            <h1>Respuesta GET /Messages/:</h1>
            <textarea className="textarea" value={messages} cols="60" rows="10" disabled></textarea>
        </div>

    )
}

export default Messages;
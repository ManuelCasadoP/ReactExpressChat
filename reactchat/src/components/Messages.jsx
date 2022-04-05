import { useEffect } from "react";


const Messages = ({id, pass})=>{

    let htmlGetMessages = ("");

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

    useEffect(() => {
        setInterval(() => {
          //Leer mensajes cada 30 segundos.
          
          getMessageHandler();

        }, 10000);
      }, []);

      
    function getMessageHandler(){
        const urlLogin="https://web-develop-react-express-chat.herokuapp.com/messages/"
        const token = authToken(id, pass);
        authGet(urlLogin, token).then(data => htmlGetMessages = JSON.stringify(data));
        console.log("Leyendo Mensajes....");
    }
    

    return (

        <div className="container">
            <h2>Respuesta GET /users/: </h2>
            <p>{htmlGetMessages}</p>
        </div>

    )
}

export default Messages;
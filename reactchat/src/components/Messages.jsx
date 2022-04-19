import { useEffect, useRef, useState } from "react";

import SendMessages from "./SendMessage";

const Messages = ({id, pass, setLogin})=>{

    const [ messages, setMessages ] = useState ("");
    //const [ users, getUsers] = useState ("");
    const interval = useRef(0);

    //let htmlGetMessages=("");
    //let usersList=("");

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

    /**
     * GET users sin autenticación
     */
     async function noAuthGetUsers(url) {
        const response = await fetch(
            url,
            { 
                headers: {
                    //Authorization: token
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
      }, [id, pass,]);
    
    // Función que genera un token para leer los mensajes con autenticación.  
    function getMessageHandler(id, pass){
        const urlLogin="https://web-develop-react-express-chat.herokuapp.com/messages/"
        const urlLogin2="https://web-develop-react-express-chat.herokuapp.com/users/"
        const token = authToken(id, pass);
        authGet(urlLogin, token).then(data => { 
            const htmlGetMessages = data 

                noAuthGetUsers(urlLogin2).then(data =>{ 
                    const usersList = data 

                    for (let i = 0; i < htmlGetMessages.length; i++) {
                        htmlGetMessages[i].time = new Date(htmlGetMessages[i].time).toLocaleString();
                    }
    
                    
                    for (let i = 0; i < htmlGetMessages.length; i++) {
                        let user = usersList.find(item=>item.id === htmlGetMessages[i].source);
                        htmlGetMessages[i].source = user.name;
                        //break;
                    }   

                    const htmlMessages = htmlGetMessages.map(
                        (msg,idx) => {
                            if (true) {
                                return <p className="divContainerMessage otherMessages" key={idx}>Time: {msg.time}<br/>user: {msg.source}<br/> msg: {msg.content}</p>
                            } else {
                                return <p className="divContainerMessage myMessage" key={idx}>Time: {msg.time}<br/>user: {msg.source}<br/> msg: {msg.content}<hr/></p>
                            }
                        }
                    )

                    setMessages(htmlMessages); 
                    console.log("Leyendo Mensajes....");
                    console.log(htmlMessages);
                    console.log(token);
                }); 
        }); 
    }

    function switchOffButtonHandler(){
        setLogin(true);
    }
    
    return (

        <div className="containerMessages">
            <h1>Respuesta GET /Messages/:</h1>
            {/*<textarea className="textarea" value={messages} cols="180" rows="50" disabled></textarea>*/}
            <div className="divMessages">
                    {messages}
            </div>
            

            <SendMessages id={id} pass={pass}/>
            <button type="button" className='switchOffButton' onClick={switchOffButtonHandler}>Off</button>
        </div>

    )
}

export default Messages;

/*
function getMessageHandler(id, pass){
    const urlLogin="https://web-develop-react-express-chat.herokuapp.com/messages/"
    const urlLogin2="https://web-develop-react-express-chat.herokuapp.com/users/"
    const token = authToken(id, pass);
    authGet(urlLogin, token).then(data => { 
        const htmlGetMessages = data 

            noAuthGetUsers(urlLogin2).then(data =>{ 
                const usersList = data 

                for (let i = 0; i < htmlGetMessages.length; i++) {
                    htmlGetMessages[i].time = new Date(htmlGetMessages[i].time).toLocaleString();
                }

                
                for (let i = 0; i < htmlGetMessages.length; i++) {
                    let user = usersList.find(item=>item.id === htmlGetMessages[i].source);
                    htmlGetMessages[i].source = user.name;
                    //break;
                }   

                setMessages(JSON.stringify(htmlGetMessages)); 

            }); 
    }); 
   
    console.log("Leyendo Mensajes....");
    console.log(htmlGetMessages);
    console.log(token);
}
*/
const host = "https://web-develop-react-express-chat.herokuapp.com"
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#getUsersButton");
const setUserButton = document.querySelector("#setUserButton");
const sendMessageButton = document.querySelector("#sendMessageButton");
const getMessageButton = document.querySelector("#getMessagesButton");

let id = 0;

htmlUpdateButton.addEventListener("click", updateButtonClickHandler);
setUserButton.addEventListener("click", getUserDataButtonHandler);
sendMessageButton.addEventListener("click", sendMessageButtonHandler);

async function get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getUsers () {
    const users = await get(host+"/users/");
    htmlGetUsers.innerText = JSON.stringify(users);
};

function updateButtonClickHandler() {
    getUsers();
}

function getUserDataButtonHandler(){
    const urlLogin="https://web-develop-react-express-chat.herokuapp.com/login/"
    const user = document.querySelector("#user").value;
    const pass = document.querySelector("#pass").value;
    let userData=JSON.stringify({userName: user, password: pass});
    //document.querySelector("#user").value ="";
    //document.querySelector("#pass").value ="";
    console.log("Enviando datos de alta de usuario...")
    console.log(user + " , " +  pass);
    setUserPost(urlLogin, userData);
    return pass;
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
    id = responseData;
    return responseData;
}

function sendMessageButtonHandler(){
    const urlLogin="https://web-develop-react-express-chat.herokuapp.com/message/"
    const user = document.querySelector("#user").value;
    const pass = document.querySelector("#pass").value;
    const message = JSON.stringify({"content": document.querySelector("#message").value});
    const token = authToken(id, pass);
    console.log(user);
    console.log(pass);
    console.log(token);
    console.log(urlLogin);
    console.log(message);
    authPost(urlLogin, token, message);
    console.log("Enviando Mensaje....");
}

function authToken(id, secret) {
    // En autenticación Basic, usuario y contraseña se separan con ':'
    const authToken = `${id}:${secret}`;
    // Y se codifican en Base64
    const base64token = btoa(authToken);
    console.log(base64token);
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


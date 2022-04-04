
const host = "https://web-develop-react-express-chat.herokuapp.com"
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");
const sendButton = document.querySelector("#sendButton");


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
    document.querySelector("#user").value ="";
    document.querySelector("#pass").value ="";
    console.log("Enviando datos de alta de usuario...")
    console.log(user + " , " +  pass);
    console.log(userData);
    setUserPost(urlLogin, userData);
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
    return responseData;
}

htmlUpdateButton.addEventListener("click", updateButtonClickHandler);
sendButton.addEventListener("click", getUserDataButtonHandler);
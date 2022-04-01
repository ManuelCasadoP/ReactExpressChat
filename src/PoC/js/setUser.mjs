const sendButton = document.querySelector("#sendButton");

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

sendButton.addEventListener("click", getUserDataButtonHandler);

export default setUserPost

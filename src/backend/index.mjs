import express from 'express';
// const express = require("express");

import {
    sqlCallback,
    findUser,
    insertUser,
    getUsers,
    findSource,
    insertMessage,
    getLastMessages,
} from "./db.mjs";

const app = express();
app.use(express.json());

// Nuestra nodelo de datos.
class User {
    constructor (name, password) {
        this.name = name;
        this.password = password;
        this.id = Date.now();
    }
}
class Message {
    constructor (source, content) {
        this.source = source;
        this.content = content;
        this.time = Date.now();
    }
}
const users = [];
const messages = [];

function authMiddleware (request, response, next) {
    if ( ! request.headers.authorization ) {
        response.status(401);
        response.send(`Authentication requiered.`);
    } else {
        const [ authType, b64token ] = request.headers.authorization.split(" ",2);
        if ( authType !== "Basic") {
            response.status(400);
            response.send(`Ùnknown authentication type: ${authType}`);
        }
        const token = atob(b64token);
        const [ source, password ] = token.split(":",2);
        findSource(source, password, (error, data)=>{
            if (error) console.error(error);
            if ( data ) {
                next();
            } else {
                response.status(401);
                response.json('Unauthorized');
            }
        });
    };
}

app.post('/login/', (request, response) => {
    const { userName, password } = request.body;
    findUser(userName, password, (error, data)=>{
        if (error) console.error(error);
        if ( data ) {
            response.status(401);
            response.send("Usuario ya registrado");
        } else {
            const newUser = new User(userName, password);
            insertUser(newUser,sqlCallback);
            const json = JSON.stringify(newUser.id)
            response.send(json);
        }
    });

});

app.get('/users/', (request, response)=>{
    getUsers((error, data)=>{
        if ( error ) {
            console.error(error);
            response.status(500)
            response.send("Database error.")
        }
        if ( data ){
            const json = JSON.stringify(data)
            response.send(json);
        }
    });
});

app.post('/message/', authMiddleware, (request, response) => {
    const { source, content } = request.body;
    const newMessage = new Message(source, content);
    insertMessage(newMessage);
    getLastMessages(1, (error, data)=>{
        if ( error ) {
            console.error(error);
            response.status(500)
            response.send("Database error.")
        }
        if ( data ) {
            response.json(data);
            response.send();
        }
    })
});

app.get('/messages/', authMiddleware, (request, response) => {
    getLastMessages(1, (error, data)=>{
        if ( error ) {
            console.error(error);
            response.status(500)
            response.send("Database error.")
        }
        if ( data ) {
            response.json(data);
            response.send();
        }
    })
});

app.listen(5000, () => {
    console.log(`Example app listening on http://127.0.0.1:5000`)
})